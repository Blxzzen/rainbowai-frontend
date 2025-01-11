const stackIcons = import.meta.glob("../assets/stackico/*.svg", { eager: true });

const icons: { [key: string]: string } = {};

for (const [path, module] of Object.entries(stackIcons)) {
    const key = path.split("/").pop()?.split(".")[0]; // Extract file name without extension
    if (key && module && typeof module === "object" && "default" in module) {
        icons[key] = module.default as string; // Add the default export (image path) to the icons object
    }
}

export default icons;
