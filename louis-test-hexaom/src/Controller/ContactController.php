<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Repository\ContactRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use PhpParser\Node\Stmt\TryCatch;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Constraints\Length;

class ContactController extends AbstractController
{
    #[Route('/api/contacts', name: 'getContacts',methods:['GET'])]
    public function getAllContacts(ContactRepository $repo,SerializerInterface $serializer): JsonResponse
    {
        $contacts=$repo->findAll();
        $jsonContacts=$serializer->serialize($contacts,"json");
        return new JsonResponse(
            $jsonContacts,
            Response::HTTP_OK,
            [],
            true
        );
    }

    #[Route('/api/contacts/{id}', name: 'getContact',methods:['GET'])]
    public function getContact(Contact $contact,ContactRepository $repo,SerializerInterface $serializer): JsonResponse
    {
        $jsonContact=$serializer->serialize($contact,"json");
        return new JsonResponse(
            $jsonContact,
            Response::HTTP_OK,
            [],
            true
        );
    }


    #[Route('/api/contact', name:"createContact", methods: ['POST'])]
    public function createBook(Request $request, SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse 
    {
        $contact=null;
        try {
            $contact = $serializer->deserialize($request->getContent(), Contact::class, 'json');
        } catch (Exception $e) {
            return new JsonResponse(null, Response::HTTP_BAD_REQUEST,["error"=> $e->getMessage()]);
        }
        if(strlen($contact->getNom()) > 40 || strlen($contact->getPrenom()) > 40 ) {return new JsonResponse(null, Response::HTTP_BAD_REQUEST,["error"=> "nom ou prenom trop long"]);}

        if(!preg_match("/^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$/",$contact->getMail()) ){return new JsonResponse(null, Response::HTTP_BAD_REQUEST,["error"=> "email invalide"]);}

        if(!preg_match("/^[0-9]{10}$/",$contact->getTelephone()) ){return new JsonResponse(null, Response::HTTP_BAD_REQUEST,["error"=> "telephone invalide"]);}


        $em->persist($contact);
        $em->flush();

        $jsonContact = $serializer->serialize($contact, 'json');

        return new JsonResponse($jsonContact, Response::HTTP_CREATED,[], true);
   }
}
