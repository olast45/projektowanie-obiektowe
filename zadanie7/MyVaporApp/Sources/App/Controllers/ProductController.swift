import Vapor
import Fluent

struct ProductContext: Content {
    let products: [Product]
}

struct ProductController: RouteCollection {

    func boot(routes: RoutesBuilder) throws {
    let products = routes.grouped("products")

    products.get(use: index)
    products.get("view", use: productsPage)

    products.get(":id", use: show)
    products.post(use: create)
    products.put(":id", use: update)
    products.delete(":id", use: delete)
    }

    func index(req: Request) throws -> EventLoopFuture<[Product]> {
        Product.query(on: req.db).all()
    }

    func show(req: Request) throws -> EventLoopFuture<Product> {
        Product.find(req.parameters.get("id"), on: req.db)
            .unwrap(or: Abort(.notFound))
    }

    func create(req: Request) throws -> EventLoopFuture<Product> {
        let product = try req.content.decode(Product.self)
        return product.save(on: req.db).map { product }
    }

    func update(req: Request) throws -> EventLoopFuture<Product> {
        let input = try req.content.decode(Product.self)

        return Product.find(req.parameters.get("id"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { product in
                product.name = input.name
                product.price = input.price
                return product.save(on: req.db).map { product }
            }
    }

    func delete(req: Request) throws -> EventLoopFuture<HTTPStatus> {
        Product.find(req.parameters.get("id"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { $0.delete(on: req.db) }
            .transform(to: .ok)
    }

    func productsPage(req: Request) async throws -> View {
    let products = try await Product.query(on: req.db).all()

    return try await req.view.render(
        "products",
        ProductContext(products: products)
    )
}
}