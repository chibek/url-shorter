export default () => {
  const copyToClipboardAsync = (str) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(str);
    return Promise.reject("The Clipboard API is not available.");
  };

  return {
    copy: copyToClipboardAsync,
  };
};