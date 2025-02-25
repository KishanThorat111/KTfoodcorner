"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_1 = require("./data");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:4200"]
}));
app.get("/api/foods", (req, res) => {
    res.send(data_1.sample_foods);
});
app.get("/api/foods/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const foods = data_1.sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(foods);
});
app.get("/api/foods/tags", (req, res) => {
    res.send(data_1.sample_tags);
});
app.get("/api/foods/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const foods = data_1.sample_foods.filter(food => { var _a; return (_a = food.tags) === null || _a === void 0 ? void 0 : _a.includes(tagName); });
    res.send(foods);
});
app.get("/api/foods/:foodId", (req, res) => {
    const foodId = req.params.foodId;
    const foods = data_1.sample_foods.find(food => food.id == foodId);
    res.send(foods);
});
app.post("/api/users/login", (req, res) => {
    const { email, password } = req.body;
    const user = data_1.sample_users.find(user => user.email === email && user.password === password);
    if (user) {
        res.send(generateTokenResponse(user));
    }
    else {
        res.status(400).send("User name or Password is invalid");
    }
});
const generateTokenResponse = (user) => {
    const token = jsonwebtoken_1.default.sign({
        email: user.email, isAdmin: user.isAdmin
    }, "KTfoodcorner", {
        expiresIn: "30d"
    });
    user.token = token;
    return user;
};
const port = 5000;
app.listen(port, () => {
    console.log("Website is Running on http://localhost:" + port);
});
