$(document).ready(() => {
  // DOM components
  const inputBox = document.getElementById('input-text');
  const cidBox = document.getElementById('ipfs-request');
  // Confirmation message
  console.log('web3Bridge.js loaded');
  // Function calls
  $('#add-data').click(() => {
    addData(inputBox.value);
  });
  $('#get-data').click(() => {
    getData(cidBox.value);
  });
  $('#add-file').click(() => {
    addFile();
  });
});

async function addFile() {
  const reader = new FileReader();
  reader.onloadend = function () {
    const buf = buffer.Buffer.from(reader.result);
    // const objBuf = { ...buf };
    // console.log(objBuf);
    const route = 'addFile';
    const req = { data: buf };
    function update(response) {
      $('#output-text').val(response.path);
    }
    ajaxCall(route, req, update);
  }
  const file = document.getElementById("file");
  reader.readAsArrayBuffer(file.files[0]);
}

async function addData(newData) {
  const route = 'addData';
  const req = { data: newData };
  function update(response) {
    $('#output-text').val(response.path);
  }
  ajaxCall(route, req, update);
}

async function getData(cid) {
  const route = 'getData';
  const req = { data: cid };
  function update(response) {
    $('#output-text').val(response[0]);
    // var image = document.createElement('img');
    // var b64encoded = btoa(String.fromCharCode.apply(null, getImageResult.imagebuffer));
    var datajpg = "data:image/jpg;base64," + response[0];
    document.getElementById("ipfs-image").src = datajpg;
  }
  ajaxCall(route, req, update);
}

// async function addFile(newData) {

// }