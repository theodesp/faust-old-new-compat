const { withFaust: withOldFaust } = require('@faustjs/next');
const { withFaust } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust(withOldFaust());
