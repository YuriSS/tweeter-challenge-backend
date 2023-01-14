"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserUsecase = void 0;
class FindUserUsecase {
    constructor(userRepository, makeId) {
        this.userRepository = userRepository;
        this.makeId = makeId;
    }
    async execute(input) {
        const user = await this.userRepository.find(this.makeId.create(input.id));
        return user;
    }
}
exports.FindUserUsecase = FindUserUsecase;
