const env = process.env.NODE_ENV === 'development'

const devurl = [
	// "https://dev3.taixiyou.com",
	"https://dev5.huayingtenghui.com"
]

const depurl = [
	'https://dev5.huayingtenghui.com'
	// "https://dev4.taixiyou.com",
]

const dev = {
	baseUrl: devurl[0],
	bendiUploadimgUrl: devurl[0] + '',
	bendiUploadFilesUrl: depurl[0] + '/api/cast/upload_file',
}

const dep = {
	baseUrl: depurl[0],
	bendiUploadimgUrl: depurl[0] + '',
	bendiUploadFilesUrl: depurl[0] + '/api/cast/upload_file',
}

const def = {
	projectName: uni.getSystemInfoSync().appName,
	version: uni.getSystemInfoSync().appVersion,
	downloadAppUrl: '',
	token: '',

	lightColor: '#ffffff',
	lightBgColor: '#FBF7F2',
	lightMainColor: '#2D3746',
	lightTextColor: '#000000',
	lightTextContent: '#747982',
	lightTextTips: '#9B9B9B',
	lightTextPlaceholder: '#999999',
	lightNavInactive: '#999DAB',
	lightBtnBgColor: '#007BFF',
	lightTabBg: '#FFFFFF',

	darkColor: '#1E1E1E',
	darkBgColor: '#000000',
	darkMainColor: '#FFFFFF',
	darkTextColor: '#FFFFFF',
	darkTextContent: '#747982',
	darkTextTips: '#9B9B9B',
	darkTextPlaceholder: '#55566c',
	darkNavInactive: '#999DAB',
	darkBtnBgColor: '#dfc9a4',
	darkTabBg: '#000000',

	NFTAddress: '0x0E762F4D11439B1130D402995328b634cB9c9973',
	NFTAgreement: 'ERC721&DDC1155',
	NFTNetwork: '文昌链',
}

let config = {}

if (env) {
	config = {...def, ...dev}
} else {
	config = {...def, ...dep}
}

export default {
	...config,
	env,
}
