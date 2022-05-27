export default function validateAddManga(value){
  let errors = {};

  if (!value.name) {
    errors.name = 'Name is required';
  }

  if (!value.author) {
    errors.author = 'Author is required';
  }

  if (!value.url) {
    errors.url = 'Url is required';
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(value.url)) {
    errors.url = 'Invalid URL';
  }

  if (!value.description) {
    errors.description = 'Description is required';
  }


  return errors;
}