#[Route('/category', name: 'category_')]
class CategoryController extends AbstractController
{
    #[Route('/', name: 'index', methods: ['GET'])]
    public function index(CategoryRepository $repo): JsonResponse
    {
        return $this->json($repo->findAll());
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $category = new Category();
        $category->setName($data['name']);
        $category->setDescription($data['description'] ?? null);
        $em->persist($category);
        $em->flush();

        return $this->json($category, 201);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT', 'PATCH'])]
    public function update(int $id, Request $request, CategoryRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $category = $repo->find($id);
        if (!$category) return $this->json(['error'=>'Not found'], 404);

        $data = json_decode($request->getContent(), true);
        $category->setName($data['name'] ?? $category->getName());
        $category->setDescription($data['description'] ?? $category->getDescription());
        $em->flush();

        return $this->json($category);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id, CategoryRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $category = $repo->find($id);
        if (!$category) return $this->json(['error'=>'Not found'], 404);

        $em->remove($category);
        $em->flush();

        return $this->json(['deleted'=>true]);
    }
}
