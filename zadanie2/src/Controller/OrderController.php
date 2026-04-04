<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\Product;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/order', name: 'order_')]
class OrderController extends AbstractController
{
    private $em;
    private $orderRepository;

    public function __construct(EntityManagerInterface $em, OrderRepository $orderRepository)
    {
        $this->em = $em;
        $this->orderRepository = $orderRepository;
    }

    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $orders = $this->orderRepository->findAll();
        return $this->json($orders, 200, [], ['groups' => 'order:read']);
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $order = new Order();
        $order->setQuantity($data['quantity'] ?? 1);
        $order->setTotalPrice($data['total_price'] ?? 0);

        if (!empty($data['product_id'])) {
            $product = $this->em->getRepository(Product::class)->find($data['product_id']);
            if ($product) {
                $order->setProduct($product);
            }
        }

        $this->em->persist($order);
        $this->em->flush();

        return $this->json($order, 201, [], ['groups' => 'order:read']);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $order = $this->orderRepository->find($id);

        if (!$order) {
            return $this->json(['error' => 'Order not found'], 404);
        }

        return $this->json($order, 200, [], ['groups' => 'order:read']);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT', 'PATCH'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $order = $this->orderRepository->find($id);
        if (!$order) {
            return $this->json(['error' => 'Order not found'], 404);
        }

        $data = json_decode($request->getContent(), true);
        if (isset($data['quantity'])) {
            $order->setQuantity($data['quantity']);
        }
        if (isset($data['total_price'])) {
            $order->setTotalPrice($data['total_price']);
        }

        if (!empty($data['product_id'])) {
            $product = $this->em->getRepository(Product::class)->find($data['product_id']);
            if ($product) {
                $order->setProduct($product);
            }
        }

        $this->em->flush();

        return $this->json($order, 200, [], ['groups' => 'order:read']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $order = $this->orderRepository->find($id);

        if (!$order) {
            return $this->json(['error' => 'Order not found'], 404);
        }

        $this->em->remove($order);
        $this->em->flush();

        return $this->json(['message' => 'Order deleted'], 200);
    }
}
