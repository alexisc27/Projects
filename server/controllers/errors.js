// Shared helpers so every controller reports errors the same way.

function handleError(res, error) {
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ error: error.errors.map(e => e.message).join(', ') });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'That email is already in use' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong on the server' });
}

// Copies only the allowed fields from the request body.
function pick(body, fields) {
    const result = {};
    for (const field of fields) {
        if (body[field] !== undefined) {
            result[field] = body[field];
        }
    }
    return result;
}

module.exports = { handleError, pick };
