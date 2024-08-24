"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";

const API_URL = "http://localhost:5050/admin";

export const dataProvider = dataProviderSimpleRest(API_URL);
