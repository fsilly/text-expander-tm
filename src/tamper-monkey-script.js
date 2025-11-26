// ==UserScript==
// @name        Text Expander
// @namespace   http://tampermonkey.net/
// @version     0.1
// @description Try to take over the world!
// @author      You
// @match       *://*/*
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    // Define your shortcuts here
    const shortcuts = {
        '/em': 'your.email@example.com',
        '/sig': 'Best regards,\nYour Name'
    };

    // Configuration
    const EXPANSION_DELAY = 4; // milliseconds

    function expandText(event) {
        if (!event.target.matches('input, textarea')) return;

        const text = event.target.value;
        const selectionStart = event.target.selectionStart;
        const selectionEnd = event.target.selectionEnd;

        // Look for shortcuts ending with space or punctuation
        const match = text.slice(0, selectionStart).match(/([\/@#]\w+)[\s.,!?]$/);

        if (match && shortcuts[match[1]]) {
            event.preventDefault();

            // Replace the shortcut with expanded text
            event.target.value = text.slice(0, selectionStart - match[0].length) +
                               shortcuts[match[1]] +
                               text.slice(selectionEnd);

            // Set cursor position
            event.target.selectionStart = selectionStart - match[0].length + shortcuts[match[1]].length;
            event.target.selectionEnd = event.target.selectionStart;

            // Prevent further processing
            event.stopPropagation();
            return false;
        }

        return true;
    }

    // Listen for keystrokes
    document.addEventListener('keyup', function(event) {
        setTimeout(() => expandText(event), EXPANSION_DELAY);
    });
})();
