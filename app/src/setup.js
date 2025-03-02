/**
 * Sets up environment-specific behaviors.
 * @return {Object} An object containing the `cleanUp` function and `prompt` method for input.
 */
export async function setupEnvironment() {
    let cleanUp;
    let prompt;

    const IN_CONSOLE = true; // change this to false 

    if (IN_CONSOLE) {
        cleanUp = async () => { 
            // delays exiting for 1 second
            await new Promise((resolve) => setTimeout(resolve, 1000));
            process.exit();
        };
        // Importing prompt-sync for terminal-based input
        const promptSync = (await import('prompt-sync')).default;
        prompt = promptSync({ sigint: true });
    } else {
        cleanUp = () => {
            alert("Exiting, and will refresh.");
            location.reload();
        };
        // Define a suitable prompt method for browser-based input
        prompt = (message) => window.prompt(message);
    }

    return { cleanUp, prompt };
}