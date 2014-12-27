/*
* Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
* the License. You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
* an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
* specific language governing permissions and limitations under the License.
*/
var fs = require('fs');

var Q = require('q');

exports.md5sum = function (data, opt_enc, opt_digest) {
    if (!Buffer.isBuffer(data)) {
        data = new Buffer(data, opt_enc || 'utf-8');
    }

    var md5 = require('crypto').createHash('md5');
    md5.update(data);

    return md5.digest(opt_digest || 'base64');
};

exports.md5stream = function (stream) {
    var deferred = Q.defer();

    var md5 = require('crypto').createHash('md5');
    stream.on('data', function (chunk) {
        md5.update(chunk);
    });
    stream.on('end', function () {
        deferred.resolve(md5.digest('base64'));
    });

    return deferred.promise;
};

exports.md5file = function (filename) {
    return exports.md5stream(fs.createReadStream(filename));
};










/* vim: set ts=4 sw=4 sts=4 tw=120: */
