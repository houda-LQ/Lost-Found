<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    // public function test_register()
    // {
    //     $data=[
    //         "name"=>"test user",
    //         "email"=>"test@example.com",
    //         "password"=>"12356789",
    //         "password_confirmation"=>"12356789",
    //     ];
    //     $response = $this->postJson('/api/register',$data);

    //     $response->assertStatus(201);
    //     $response->assertJson([
    //         'message' => 'inscription réussie!'
    //     ]);

    //     $this->assertDatabaseHas('users', [
    //         'email' => 'test@example.com',
    //     ]);

    // }


    public function test_login()
    {
      $user = User::create([
        'name' => 'Test User',
        'email' => 'login1@gmail.com',
        'password' =>Hash::make('password123'),
        'role' => 'user',

      ]);

       $data=[
            "email"=>"login1@gmail.com",
            "password"=>"password123",
        ];

        $response=$this->postJson("/api/login",$data);
        $response->assertStatus(200);
        $response->assertJson([
         'message' => 'Connexion réussie'

        ]);

    }

    public function test_logout(){
        $user = User::create([
        'name' => 'Test User',
        'email' => 'lognUser@gmail.com',
        'password' =>Hash::make('password123'),
        'role' => 'user',

      ]);

      $token=$user->createToken("auth_token")->plainTextToken;
      $response=$this->withHeader("Authorization","Bearer " . $token)
                     ->postJson("/api/logout");

    
     $response->assertStatus(200);
     $response->assertJson([
        'message' => 'Déconnexion réussie'
     ]);
    }
}
