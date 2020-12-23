const webpush = require('web-push');

const pu_key = 'BBiZlK28hTJeOt6wDl-miwX67zv-Tvtej1UUMQQ76XsBLnlcxB3JFiBtkzRk3FcEFml7fQRo9JkkomPQ8LBRUHc';


webpush.setVapidDetails('mailto:dev@cosbiome.com', pu_key, process.env.PR_KEY);

module.exports = webpush