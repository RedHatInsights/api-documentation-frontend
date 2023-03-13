import {Command} from "commander";

export const getCommand = () => {
    return new Command()
        .description(
            `Generates the pre-renders based on the config files`
        )
        .option('-b, --base-path <base-path>', 'Base path relative to the HTTP root')
        .requiredOption('-d, --dist-dir <dist-dir>', 'Directory of the dist - where build project is located at')
        .requiredOption('-o, --output-dir <output-dir>', 'Output directory');
};
