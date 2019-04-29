var Module = {
    preRun: [],
    postRun: [],
    print: (function() {
        return function(text) {
            if (arguments.length > 1) {
                text = Array.prototype.slice.call(arguments).join(' ');
            }

            console.log(text);
        };
    })(),
    printErr: function(text) {
        if (arguments.length > 1) {
            text = Array.prototype.slice.call(arguments).join(' ');
        }
        console.error(text);
    },
    canvas: (function() {
        const canvas = document.getElementById('canvas');
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.addEventListener("webglcontextlost", function(e) {
            alert('WebGL context lost. You will need to reload the page.');
            e.preventDefault();
        }, false);

        return canvas;
    })(),
    setStatus: function(text) {
        if (!Module.setStatus.last) {
            Module.setStatus.last = { time: Date.now(), text: '' };
        }
        if (text === Module.setStatus.last.text) {
            return;
        }

        const m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
            const now = Date.now();
            if (m && now - Module.setStatus.last.time < 30) {
                return;
            }
            Module.setStatus.last.time = now;
            Module.setStatus.last.text = text;

            if (m) {
                text = m[1];
                console.log(parseInt(m[2])*100);
            }

        console.log(text);
    },
    totalDependencies: 0,
    monitorRunDependencies: function(left) {
        this.totalDependencies = Math.max(this.totalDependencies, left);
        const status = left ?
            `Preparing... (${this.totalDependencies-left}/${this.totalDependencies})` :
            'All downloads complete.';
        Module.setStatus(status);
    }
};

Module.setStatus('Downloading...');
window.onerror = function() {
    Module.setStatus('Exception thrown, see JavaScript console');
    Module.setStatus = function(text) {
        if (text) Module.printErr('[post-exception status] ' + text);
    };
};

