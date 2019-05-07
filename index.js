const config = require('./config')
const Logger = require('./lib/logger')
const DB = require('./lib/db')
const Scraper = require('./lib/scraper')
const Tokeniser = require('./lib/tokeniser')
const Classifier = require('./lib/classifier')
const Publisher = require('./lib/publisher')
const Subreddit = require('./lib/subreddit')
const Score = require('./lib/score')

const logger = new Logger(config.logger)
const db = new DB(config.db, logger)

db.on('connection', async () => {
  const scraper = new Scraper(config.scraper, logger)
  const tokeniser = new Tokeniser(logger)
  const classifier = new Classifier(config.classifier, logger)
  const publisher = new Publisher(config.publisher, logger)

  scraper.on('comments', async (comments) => {
    for (const comment of comments) {
      const tokens = tokeniser.tokenise(comment.body)
      const classification = classifier.classify(tokens)

      // create or update subreddit

      const subreddit = new Subreddit(comment.subreddit, logger)

      subreddit.on('inserted', async (data) => {
        await publisher.subredditInserted(data)
      })

      subreddit.on('updated', async (data) => {
        await publisher.subredditUpdated(data)
      })

      const subredditId = await subreddit.save(db)

      // create or update daily score

      const score = new Score(subredditId, classification, logger)

      score.on('inserted', async (data) => {
        await publisher.scoreInserted(data)
      })

      score.on('updated', async (data) => {
        await publisher.scoreUpdated(data)
      })

      await score.save(db)
    }
  })

  scraper.on('error', err => logger.error(err.message))
})

db.on('error', err => logger.error(err.message))
