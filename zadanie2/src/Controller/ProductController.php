<?php
namespace App\Controller;

use App\Entity\Product;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/product')]
class ProductController extends AbstractController
{
    // READ all products
    #[Route('/', name: 'product_index', methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): JsonResponse
    {
        $products = $doctrine->getRepository(Product::class)->findAll();
        $data = [];

        foreach ($products as $product) {
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
                'description' => $product->getDescription(),
            ];
        }

        return $this->json($data);
    }

    // CREATE a product
    #[Route('/create', name: 'product_create', methods: ['POST'])]
    public function create(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $name = $request->request->get('name');
        $price = $request->request->get('price');
        $description = $request->request->get('description', null);

        if (!$name || !$price) {
            return $this->json(['error' => 'Name and price are required'], 400);
        }

        $product = new Product();
        $product->setName($name)
                ->setPrice((float)$price)
                ->setDescription($description);

        $entityManager = $doctrine->getManager();
        $entityManager->persist($product);
        $entityManager->flush();

        return $this->json(['message' => 'Product created', 'id' => $product->getId()]);
    }

    // UPDATE a product
    #[Route('/{id}', name: 'product_update', methods: ['PUT', 'PATCH'])]
    public function update(int $id, Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $product = $entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return $this->json(['error' => 'Product not found'], 404);
        }

        $product->setName($request->request->get('name', $product->getName()))
                ->setPrice((float)$request->request->get('price', $product->getPrice()))
                ->setDescription($request->request->get('description', $product->getDescription()));

        $entityManager->flush();

        return $this->json(['message' => 'Product updated', 'id' => $product->getId()]);
    }

    // DELETE a product
    #[Route('/{id}', name: 'product_delete', methods: ['DELETE'])]
    public function delete(int $id, ManagerRegistry $doctrine): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $product = $entityManager->getRepository(Product::class)->find($id);

        if (!$product) {
            return $this->json(['error' => 'Product not found'], 404);
        }

        $entityManager->remove($product);
        $entityManager->flush();

        return $this->json(['message' => 'Product deleted']);
    }
}
