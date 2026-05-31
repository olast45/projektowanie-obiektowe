import Vapor
import Fluent

struct CategoryController: RouteCollection {

    func boot(routes: RoutesBuilder) throws {
        let categories = routes.grouped("categories")

        categories.get(use: index)
        categories.post(use: create)
        categories.get(":id", use: show)
        categories.delete(":id", use: delete)
    }

    func index(req: Request) throws -> EventLoopFuture<[Category]> {
        Category.query(on: req.db).all()
    }

    func show(req: Request) throws -> EventLoopFuture<Category> {
        Category.find(req.parameters.get("id"), on: req.db)
            .unwrap(or: Abort(.notFound))
    }

    func create(req: Request) throws -> EventLoopFuture<Category> {
        let category = try req.content.decode(Category.self)
        return category.save(on: req.db).map { category }
    }

    func delete(req: Request) throws -> EventLoopFuture<HTTPStatus> {
        Category.find(req.parameters.get("id"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { $0.delete(on: req.db) }
            .transform(to: .ok)
    }
}