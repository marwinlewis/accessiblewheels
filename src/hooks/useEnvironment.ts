"use client";

import { useEffect, useState } from "react";

type Environment = "server" | "client";

/**
 * Custom hook to detect if rendering is happening on server side or client side
 * @returns The current environment ('server' or 'client')
 */
export function useEnvironment(): Environment {
  const [environment, setEnvironment] = useState<Environment>("server");

  useEffect(() => {
    // This runs only on the client side
    setEnvironment("client");
  }, []);

  return environment;
}

/**
 * Custom hook to check if code is running on client side
 * @returns Boolean indicating if currently on client side
 */
export function useIsClient(): boolean {
  const environment = useEnvironment();
  return environment === "client";
}

/**
 * Custom hook to check if code is running on server side
 * @returns Boolean indicating if currently on server side
 */
export function useIsServer(): boolean {
  const environment = useEnvironment();
  return environment === "server";
}
