const { URL } = require('url');
module.exports = {
    names: ['MDC01', 'no-relative-links'],
    description: 'Rule that reports an error for any relative links',
    tags: ['links'],
    function: (params, onError) => {
        params.tokens.filter(token => token.type === 'inline').forEach(token => {
            token.children.filter(child => child.type === 'link_open').forEach(child => {
                const link = child.attrs.find(attribute => attribute[0] === 'href');
                if (link) {
                    const hrefValue = link[1];
                    try {
                        new URL(hrefValue);
                    } catch (e) {
                        if (!hrefValue.startsWith('#')) { // Allow anchor links
                            onError({
                                lineNumber: child.lineNumber,
                                detail: `Found a relative link: ${hrefValue}`
                            });
                        }
                    }
                }
            });
        });
    }
};