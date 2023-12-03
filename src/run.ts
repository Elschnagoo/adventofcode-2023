import { CoreLogChannel, DefaultLogger, LogLevel } from '@grandlinex/core';
import Day01Part01 from './puzzle/01/Part01';
import Day01Part02 from './puzzle/01/Part02';
import Day02Part01 from './puzzle/02/Part01';
import Day02Part02 from './puzzle/02/Part02';
import Day03Part01 from './puzzle/03/Part01';

const logger = new DefaultLogger(LogLevel.WARN);
logger.setPrintTimestamp(false);

const devLogger = new DefaultLogger(LogLevel.VERBOSE);
devLogger.setPrintTimestamp(false);
devLogger.setPrintObject(true);

const printLog = new CoreLogChannel('result', logger);

(async () => {
  const puzzles = [
    new Day01Part01(), // 54388
    new Day01Part02(), // 53515
    new Day02Part01(), // 2105
    new Day02Part02(), // 72422
    new Day03Part01(), // 525119
  ];
  for (const puzzle of puzzles) {
    const result = await puzzle.run();
    printLog.info(`Result for puzzle ${puzzle.name}: ${result}`);
  }
})();
