
export const message =  [
    { code: 400, msg: '1、语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。 　　2、请求参数有误。'},
    { code: 404, msg: '请求失败，请求所希望得到的资源未被在服务器上发现。'},
    { code: 405, msg: '请求行中指定的请求方法不能被用于请求相应的资源。'},
    { code: 413, msg: '服务器拒绝处理当前请求，因为该请求提交的实体数据大小超过了服务器愿意或者能够处理的范围。此种情况下，服务器可以关闭连接以免客户端继续发送此请求。 　　如果这个状况是临时的，服务器应当返回一个 Retry-After 的响应头，以告知客户端可以在多少时间以后重新尝试。'},
    { code: 414, msg: '请求的URI 长度超过了服务器能够解释的长度，因此服务器拒绝对该请求提供服务。'},
    { code: 500, msg: '服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器的程序码出错时出现。'},
    { code: 501, msg: '服务器不支持当前请求所需要的某个功能。当服务器无法识别请求的方法，并且无法支持其对任何资源的请求。'},
    { code: 502, msg: '作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。'},
    { code: 503, msg: '由于临时的服务器维护或者过载，服务器当前无法处理请求。'},
    { code: 504, msg: '作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（URI标识出的服务器，例如HTTP、FTP、LDAP）或者辅助服务器（例如DNS）收到响应。'},
    { code: 505, msg: '服务器不支持，或者拒绝支持在请求中使用的 HTTP 版本。这暗示着服务器不能或不愿使用与客户端相同的版本。响应中应当包含一个描述了为何版本不被支持以及服务器支持哪些协议的实体。'},
    { code: 600, msg: ''},
]


// 状态码参考地址: http://tool.oschina.net/commons?type=5