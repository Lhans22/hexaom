<?php

namespace App\DataFixtures;

use App\Entity\Contact;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;


class AppFixtures extends Fixture
{
    /** 
     * @var Generator 
     **/
    private Generator $faker;

    public function __construct(){
        $this->faker=Factory::create('fr_FR');
    }

    public function load(ObjectManager $manager): void
    {
        for($i=0;$i<50;$i++){
            $contact = new Contact();
            $contact->setNom($this->faker->userName())
                ->setPrenom($this->faker->userName())
                ->setMail($this->faker->freeEmail())
                ->setTelephone('07'.strval($this->faker->randomNumber(8, true)));
            $manager->persist($contact);
        }
        

        $manager->flush();
    }
}
