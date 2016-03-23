'use strict';

angular.module('bm.version', [
  'bm.version.interpolate-filter',
  'bm.version.version-directive'
])

.value('version', '0.1');
