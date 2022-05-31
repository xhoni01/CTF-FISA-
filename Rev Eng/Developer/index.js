const flagInput = document.getElementById("flag")
const checkButton = document.getElementById("check_flag")
const correctFlag = document.getElementById("correct_flag")
const wrongFlag = document.getElementById("wrong_flag")

const checkFlag = () => {
	let flag = flagInput.value
	if (flag.length != (0x3b ^ 0xc) - 0x3) {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}
	if (flag.charAt(0)  !== String.fromCharCode((((0x39 % 0xc) * 0x9) ^ 0xa) - 0x15) ||
		flag.charAt(1)  !== String.fromCharCode(((((0x41 % 0x999) * 0xF) % 0x17) + 0x1d) * 0x20) ||
		flag.charAt(2)  !== String.fromCharCode((((((0x35 % 0x6) ^ 0x355) >> 0x5) - 0x1) * 0x5) - 0xa) ||
		flag.charAt(3)  !== String.fromCharCode(((((((0x3d % 0x2) << 0x7) / 0xa) ^ 0x15) * 0x3) % 0x57) - 0xa) ||
		flag.charAt(4)  !== String.fromCharCode((((((((0x6b % 0x25) * 0x5) ^ 0xfff) >> 0x4) * 0xe) & 0x55) * 0x2) - 0xd) ||
		flag.charAt(46) !== String.fromCharCode(((((((((0x71 % 0x14) * 0xdc) / 0x16) << 0x5) / 0x10) >> 0x2) + 0x32) ^ 0xe)))
	{
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}
	
	if (flag.charCodeAt(5).toString(2) !== "01010111"  ||
		flag.charCodeAt(6).toString(2) !== "00110011" ||
		flag.charCodeAt(7).toString(2) !== "00110001" ||
		flag.charCodeAt(8).toString(2) !== "00110001")
	{
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if ((parseInt(flag.charCodeAt(9).toString()) ^ 0x2f) !== 0x70) {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if (convertAsciiToHex(flag.substring(10, 24)) !== "44306E335F5930755F4630756E64") {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if ((parseInt(flag.charCodeAt(24).toString()) ^ 0x2f) !== 0x70) {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if (flag.charCodeAt(25).toString(8) !== "124"  ||
		flag.charCodeAt(26).toString(8) !== "150" ||
		flag.charCodeAt(27).toString(8) !== "145")
	{
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if ((parseInt(flag.charCodeAt(28).toString()) ^ 0x2f) !== 0x70) {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if (convertAsciiToHex(flag.substring(29, 42).split("").reverse().join("")) !== "73746172676E30635F67403146") {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	if ((parseInt(flag.charCodeAt(42).toString()) ^ 0x2f) !== 0x70) {
		wrongFlag.classList.toggle("flag_status")
		setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
		return false
	}

	sha1Sum(flag.substring(43, 46)).then(hash => {
		if (hash !== "b61e3dd205186525331af385bd24dccd066cbdf9") {
			wrongFlag.classList.toggle("flag_status")
			setTimeout(() => wrongFlag.classList.toggle("flag_status"), 4000)
			return false
		}
	})
	correctFlag.classList.add("flag_status")

}

const sha1Sum = str => {
	let buffer = new TextEncoder("UTF-8").encode(str);
	return crypto.subtle.digest("SHA-1", buffer).then(digest => {
		return hexEncodeRawBytes(digest);
	});
}

const hexEncodeRawBytes = digest => {
	let view = new DataView(digest);
	let hexEncodedHash = "";
	for (let i = 0; i < view.byteLength; i += 4) {
		let hexString = view.getUint32(i).toString(16);
		let padding = '00000000'
		let paddedHexString = (padding + hexString).slice(-padding.length)
		hexEncodedHash += paddedHexString;
	}
	return hexEncodedHash;
}

const convertAsciiToHex = str => {
	let hexBytes = ""
	for (let byte of str.split("")) {
		hexBytes += byte.charCodeAt().toString(16)
	}
	return hexBytes
}

checkButton.addEventListener("click", checkFlag)

