/*eslint-disable */
export function encodeHTML(input) {
  return input.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
/* eslint-enable */

export function appendMsgToDOM(container, msg, isPrepend) {
  const htmlContent = `
    <div class="card mt-4">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${encodeHTML(msg.nickname)}</h5>
        <p class="card-text">${encodeHTML(msg.content)}</p>
        <p class="card_created_time align-self-end">${msg.created_at}</p>
      </div>
    </div>
  `;
  if (isPrepend) {
    container.prepend(htmlContent);
  } else {
    container.append(htmlContent);
  }
}
