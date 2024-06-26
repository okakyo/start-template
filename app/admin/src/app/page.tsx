"use client";

import { Suspense } from "react";
import {ThemedLayoutV2} from "@refinedev/chakra-ui"


export default function IndexPage() {
  return (
    <ThemedLayoutV2>
      <Suspense>
        <div className="content">
          <h1>Welcome to the admin panel</h1>
        </div>
      </Suspense>
    </ThemedLayoutV2>
  );
}
