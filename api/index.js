import { createRequestHandler } from "react-router-dom/server";
import * as build from "../build/server/index.js";

export default createRequestHandler({ build });
