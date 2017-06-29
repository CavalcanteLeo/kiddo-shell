#! /usr/bin/env node

const shell = require("shelljs");
const file = require("./kiddo-shell.json");

file.steps.map(step => {
	if (step) {

		shell.echo("> Opening a new tab");
		shell.exec("osascript -e 'tell application \"" + file.terminal + "\" to activate'")


		if (step.position !== 'main') {
			// Open a new tab if not main
			const pos = step.position === 'bottom' ? '{command down, shift down}' : 'command down';
			shell.exec("osascript -e 'tell application \"System Events\" to key code 2 using " + pos + "'", function(){
				shell.exec("osascript -e 'tell application \"" + file.terminal + "\" to activate'")
			});
		}

		//Run commands
		step.command.map(command => {
			if (command) {
				shell.exec("osascript -e 'tell application \"" + file.terminal + "\" to activate'")
				shell.exec("osascript -e 'tell application \"System Events\" to tell process \"" + file.terminal + "\" to keystroke \"" + command + "\"'");
				shell.exec("osascript -e 'tell application \"System Events\" to tell process \"" + file.terminal + "\" to key code 52'");
			}
		})

	}

})
