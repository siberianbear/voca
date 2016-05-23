import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import isNil from '../utils/object/is_nil';
import clipNumber from '../utils/number/clip_number';
import toInteger from '../utils/number/to_integer';
import repeat from './repeat';

/**
 * Pads `subject` to a new `length`.
 *
 * @function pad
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The padded string length. No changes are made if `length` is less than `subject.length`.
 * @param {string} [padString=' '] The string to be used for padding.
 * @return {string} Returns the padded string.
 * @example
 * v.pad('word', 6, '-');
 * // => '-word-'
 *
 * v.pad('hi', 4);
 * // => ' hi '
 */
export default function(subject, length, padString) {
  var subjectString = toString(nilDefault(subject, '')),
    subjectStringLength = subjectString.length,
    lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, Number.MAX_SAFE_INTEGER);
  padString = toString(nilDefault(padString, ' '));
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }

  var padStringRepeat = ~~((lengthInt - subjectStringLength) / padString.length),
    padStringRest = (lengthInt - subjectStringLength) % padString.length,
    pad = repeat(padString, padStringRepeat + padStringRest).substr(0, lengthInt - subjectStringLength);
  return pad + subjectString;
}