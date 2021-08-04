const { sanitize } = require('isomorphic-dompurify');

export default function sanitizer(data) {
  const sanitizedData = sanitize(data, {
    FORBID_ATTR: ['width', 'height', 'style'],
    FORBID_TAGS: ['style'],
  });
  return sanitizedData;
}
