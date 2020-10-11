export function getForm(formClassname, msgClassname) {
  return `
    <div class="row input_section">
      <div class="col">
        <form class="${formClassname}">
          <div class="form-group">
            <input name="nickname" type="text" class="form-control" id="exampleInputName" aria-describedby="nameHelp"
              placeholder="What is your name?">
          </div>
          <div class="form-group">
            <textarea name="content" class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
          </div>
          <button type="submit" class="btn send_btn">Send</button>
        </form>
      </div>
    </div>
    <section class="${msgClassname} msg_section p-3"></section>
`;
}

export function getLoadMoreBtn(classname) {
  return `<button class="${classname} load_btn btn mt-4">Load More</button>`;
}
