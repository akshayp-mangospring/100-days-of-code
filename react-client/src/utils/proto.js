// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, 'getFirst', {
  value: function () { return this[0]; }
});

// eslint-disable-next-line no-extend-native
Object.defineProperty(String.prototype, 'isNotEmpty', {
  value: function () { return this !== ''; }
});
