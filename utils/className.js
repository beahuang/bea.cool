/**
 * Helper for React components for easily composing dynamic
 * className lists.
 *
 * This will only append classes of type string, making it
 * easy to write conditional statements in classes:
 *
 * ```js
 * <p {...className(styles.text, large && styles.textLarge)} />
 * ```
 *
 * @param  {...any} classes the classes to append to the
 * className field
 * @returns an object with the field `className` to spread on
 * a React component
 */
const className = (...classes) => ({
  className: classes.filter(className => typeof className === 'string').join(' '),
});

export default className;
