export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  // If the module is already loaded then throw error
  if (parentModule) {
    // Throw error message
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}
