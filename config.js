module.exports = {
  logger: {
    level: process.env.LOG_LEVEL || 'info'
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'ssanalysis',
    password: process.env.DB_PASSWORD || 'S-mE{xVgn%h69}n!',
    database: process.env.DB_NAME || 'ssanalysis'
  },
  scraper: {
    url: process.env.SCRAPER_URL || 'https://www.reddit.com/r/all/comments/.json?limit=100',
    intervalMs: process.env.SCRAPER_INTERVAL_MS ? parseInt(process.env.SCRAPER_INTERVAL_MS, 10) : 5000,
    numCachedDuplicates: process.env.SCRAPER_NUM_CACHED_DUPLICATES ? parseInt(process.env.SCRAPER_NUM_CACHED_DUPLICATES, 10) : 1000
  },
  classifier: {
    lang: process.env.CLASSIFIER_LANG || 'en'
  },
  publisher: {
    projectId: process.env.PUBLISHER_PROJECT_ID || 'subreddit-sentiment-analysis',
    subredditInsertedTopicName: process.env.PUBLISHER_SUBREDDIT_INSERTED_TOPIC_NAME || 'subredditInserts',
    subredditUpdatedTopicName: process.env.PUBLISHER_SUBREDDIT_UPDATED_TOPIC_NAME || 'subredditUpdates',
    averageComputedTopicName: process.env.PUBLISHER_AVERAGE_COMPUTED_TOPIC_NAME || 'computedAverages'
  }
}
