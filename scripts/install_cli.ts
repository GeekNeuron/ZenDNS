#!/usr/bin/env node
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const cwd = process.cwd();
const target = path.join(cwd, "zendns");

if (!fs.existsSync(target)) fs.mkdirSync(target);

console.log("[+] Cloning ZenDNS...");
execSync("git clone https://github.com/GeekNeuron/ZenDNS.git " + target, { stdio: "inherit" });

console.log("[+] Installing backend deps...");
execSync("pip install -r requirements.txt", { cwd: target + "/backend", stdio: "inherit" });

console.log("[+] Launching API & UI...");
execSync("docker compose up -d", { cwd: target, stdio: "inherit" });

console.log("[✅] ZenDNS installed!");
