function sanitizeInput(input) { 
    if (typeof input !== 'string') return input; 
    return input.replace(/&/g, "&amp;") // escape & 
                .replace(/</g, "&lt;") // escape < 
                .replace(/>/g, "&gt;") // escape > 
                .replace(/"/g, "&quot;") // escape " 
                .replace(/'/g, "&#x27;") // escape ' 
                .replace(/\//g, "&#x2F;"); // escape / 
    }

const sanitizeMiddleWare = (req, res, next) => { 
    for (let key in req.body){ 
            if (typeof req.body[key] === 'string') 
                { 
                    req.body[key] = sanitizeInput(req.body[key]); 
                } 
    }

    for (let key in req.query){ 
        if (typeof req.query[key] === 'string'){ 
            req.query[key] = sanitizeInput(req.query[key]); 
        }
    }
    
    for (let key in req.params) { 
        if (typeof req.params[key] === 'string') { 
            req.params[key] = sanitizeInput(req.params[key]); 
        }
    }
    next();
}

export {sanitizeMiddleWare};