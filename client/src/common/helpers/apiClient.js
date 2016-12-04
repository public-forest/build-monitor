import superagent from 'superagent';
import { settings } from '../../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  console.log(path,settings);
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (settings.apiHost) {
    // Prepend host and port of the API server to the path.
    return 'http://' + settings.apiHost + ':' + settings.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return  adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        console.log(formatUrl(path));
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}