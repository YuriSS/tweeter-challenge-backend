"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("@infrastructure/webserver/express");
const port = Number(process.env.PORT) || 3000;
express_1.app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
