const assert = require('assert').strict
const XLS10 = require('./libxls10.js')
const sixbit = [
  '\x00',
  'a',    'b',    'c',   'd',
  'e',    'f',    'g',   'h',
  'i',    'j',    'k',   'l',
  'm',    'n',    'o',   'p',
  'q',    'r',    's',   't',
  'u',    'v',    'w',   'x',
  'y',    'z',    '0',   '1',
  '2',    '3',    '4',   '5',
  '6',    '7',    '8',   '9',
  '.',    '-',    '_',   ':',
  '/',    '?',    '#',   '[',
  ']',    '@',    '!',   '$',
  '&',    '(',    ')',   '*',
  "'",    '+',    ',',   ';',
  '=',    '~',    '%',   '\\',
  '.com', '.org', '.io'
]


test_uris = [
"http://www.example.com/#hello, world",
"http://www.example.com/#%c2%a9",
"http://www.example.com/#&#xd800;&#xdf00;ss",
"http://www.example.com/#%41%a",
"http://www.example.com/#\&#xd800;\&#x597d;",
"http://www.example.com/#a\&#xFDD0;",
"http://www.example.com/#asdf#qwer",
"http://www.example.com/##asdf",
"http://www.example.com/#a&#x000A;b&#x000D;c&#x0009;d",
"file:c:\\foo\\bar.html",
"File:c|////foo\\bar.html",
"file:",
"file:UNChost/path",
"c:\\foo\\bar",
"//server/file",
"\\\\server\\file",
"/\\server/file",
"file:c:foo/bar.html",
"file:/\\/\\C:\\\\//foo\\bar.html",
"file:///foo/bar.txt",
"FILE:/\\/\\7:\\\\//foo\\bar.html",
"file:filer/home\\me",
"file:///C:/foo/../../../bar.html",
"file:///C:/asdf#\%c2",
"file:///home/me",
"file:c:\\foo\\bar.html",
"//",
"///",
"///test",
"file://test",
"file://localhost/",
"file://localhost/test",
"file:c:\\foo\\bar.html",
"file:",
"file:UNChost/path",
"c:\\foo\\bar",
"//server/file",
"\\\\server\\file",
"/\\server/file",
"file:c:foo/bar.html",
"file:/\\/\\C:\\\\//foo\\bar.html",
"file:///foo/bar.txt",
"FILE:/\\/\\7:\\\\//foo\\bar.html",
"file:filer/home\\me",
"file:///C:/foo/../../../bar.html",
"file:///C:/asdf#\%c2",
"file:///home/me",
"file:c:\\foo\\bar.html",
"//",
"///",
"///test",
"file://test",
"file://localhost/",
"file://localhost/test",
"http://GoOgLe.CoM",
"http://GOO&#x00a0;&#x3000;goo.com",
"http://GOO&#x200b;&#x2060;&#xfeff;goo.com",
"http://www.foo&#x3002;" + "bar.com",
"http://&#xfdd0;zyx.com",
"http://%ef%b7%90zyx.com",
"http://&#xff27;&#xff4f;.com",
"http://&#xff05;&#xff14;&#xff11;.com",
"http://%ef%bc%85%ef%bc%94%ef%bc%91.com",
"http://&#xff05;&#xff10;&#xff10;.com",
"http://%ef%bc%85%ef%bc%90%ef%bc%90.com",
"http://&#x4f60;&#x597d;&#x4f60;&#x597d;",
"http://%E4%BD%A0%E5%A5%BD&#x4f60;&#x597d;",
"http://%zz%66%a",
"http://%25",
"http://hello%00",
"http://%30%78%63%30%2e%30%32%35%30.01",
"http://%30%78%63%30%2e%30%32%35%30.01%2e",
"http://%3g%78%63%30%2e%30%32%35%30%2E.01",
"http://192.168.0.1 hello",
"http://&#xff10;&#xff38;&#xff43;&#xff10;&#xff0e;&#xff10;&#xff12;&#xff15;&#xff10;&#xff0e;&#xff10;&#xff11;",
"http://192.168.0.257",
"http://[google.com]",
"http://&#x0442;(",
"http://go\@ogle.com",
"http://go/@ogle.com",
"http://www.lookout.net::==80::==443::",
"http://www.lookout.net::80::443",
"http:////:@/",
"http://\google.com/foo",
"http://\\google.com/foo",
"http:////asdf@/",
"http:////:81",
"http://://",
"http://c:",
"http://xxxx:",
"http://.:.",
"http://////@google.com/",
"http://@google.com",
"http://fa&#x00DF;.de",
"http://&#x03B2;&#x03CC;&#x03BB;&#x03BF;&#x03C2;.com",
"http://&#x0DC1;&#x0DCA;&#x200D;&#x0DBB;&#x0DD3;.com",
"http://&#x0646;&#x0627;&#x0645;&#x0647;&#x200C;&#x0627;&#x06CC;.com",
"http://www.loo&#x0138;out.net",
"http://&#x15EF;&#x15EF;&#x15EF;.lookout.net",
"http://www.lookout.&#x0441;&#x043E;&#x043C;",
"http://www.lookout.net&#xFF1A;80",
"http://www&#x2025;lookout.net",
"http://www.lookout&#x2027;net",
"http://www.loo&#x0138;out.net",
"http://www.lookout.net&#x2A74;80",
"http://www&#x00A0;.lookout.net",
"http://&#x1680;lookout.net",
"http://&#x001F;lookout.net",
"http://look&#x06DD;out.net",
"http://look&#x180E;out.net",
"http://look&#x2060;out.net",
"http://look&#xFEFF;out.net",
"http://look&#xD83F;&#xDFFE;out.net",
"http://look&#xDEAD;out.net",
"http://look&#xFFFA;out.net",
"http://look&#x2FF0;out.net",
"http://look&#x0341;out.net",
"http://look&#x202E;out.net",
"http://look&#x206B;out.net",
"http://look&#xDB40;&#xDC01;out.net",
"http://look&#xDB40;&#xDC20;out.net",
"http://look&#x05BE;out.net",
"http://B&#x00FC;cher.de",
"http://fa&#x00DF;.de",
"http://&#x03B2;&#x03CC;&#x03BB;&#x03BF;&#x03C2;.com",
"http://&#x0DC1;&#x0DCA;&#x200D;&#x0DBB;&#x0DD3;.com",
"http://&#x0646;&#x0627;&#x0645;&#x0647;&#x200C;&#x0627;&#x06CC;.com",
"http://&#x2665;.net",
"http://&#x0378;.net",
"http://&#x04C0;.com",
"http://&#xD87E;&#xDC68;.com",
"http://&#x2183;.com",
"http://look&#x034F;out.net",
"http://gOoGle.com",
"http://&#x09dc;.com",
"http://&#x1E9E;.com",
"http://&#x1E9E;.foo.com",
"http://-foo.bar.com",
"http://foo-.bar.com",
"http://ab--cd.com",
"http://xn--0.com",
"http://foo&#x0300;.bar.com",
"http://.",
"http://192.168.0.1",
"http://0300.0250.00.01",
"http://0xC0.0Xa8.0x0.0x1",
"http://192.168.9.com",
"http://19a.168.0.1",
"http://0308.0250.00.01",
"http://0xCG.0xA8.0x0.0x1",
"http://192",
"http://0xC0a80001",
"http://030052000001",
"http://000030052000001",
"http://192.168",
"http://192.0x00A80001",
"http://0xc0.052000001",
"http://192.168.1",
"http://192.168.0.0.1",
"http://192.168.0.1.",
"http://192.168.0.1. hello",
"http://192.168.0.1..",
"http://192.168..1",
"http://0x100.0",
"http://0x100.0.0",
"http://0x100.0.0.0",
"http://0.0x100.0.0",
"http://0.0.0x100.0",
"http://0.0.0.0x100",
"http://0.0.0x10000",
"http://0.0x1000000",
"http://0x100000000",
"http://0xFF.0",
"http://0xFF.0.0",
"http://0xFF.0.0.0",
"http://0.0xFF.0.0",
"http://0.0.0xFF.0",
"http://0.0.0.0xFF",
"http://0.0.0xFFFF",
"http://0.0xFFFFFF",
"http://0xFFFFFFFF",
"http://276.256.0xf1a2.077777",
"http://192.168.0.257",
"http://192.168.0xa20001",
"http://192.015052000001",
"http://0X12C0a80001",
"http://276.1.2",
"http://192.168.0.1 hello",
"http://0000000000000300.0x00000000000000fF.00000000000000001",
"http://0000000000000300.0xffffffffFFFFFFFF.3022415481470977",
"http://00000000000000000001",
"http://0000000000000000100000000000000001",
"http://0.0.0.000000000000000000z",
"http://0.0.0.100000000000000000z",
"http://0.00.0x.0x0",
"http://[",
"http://[:",
"http://]",
"http://:]",
"http://[]",
"http://[:]",
"http://2001:db8::1",
"http://[2001:db8::1",
"http://2001:db8::1]",
"http://[::]",
"http://[::1]",
"http://[1::]",
"http://[::192.168.0.1]",
"http://[::ffff:192.168.0.1]",
"http://[000:01:02:003:004:5:6:007]",
"http://[A:b:c:DE:fF:0:1:aC]",
"http://[1:0:0:2::3:0]",
"http://[1::2:0:0:3:0]",
"http://[::eeee:192.168.0.1]",
"http://[2001::192.168.0.1]",
"http://[1:2:192.168.0.1:5:6]",
"http://[::ffff:192.1.2]",
"http://[::ffff:0xC0.0Xa8.0x0.0x1]",
"http://[0:0::0:0:8]",
"http://[2001:db8::1]",
"http://[2001::db8::1]",
"http://[2001:db8:::1]",
"http://[:::]",
"http://[2001::.com]",
"http://[::192.168.0.0.1]",
"http://[::ffff:192.168.0.0.1]",
"http://[1:2:3:4:5:6:7:8:9]",
"http://[0:0:0:0:0:0:0:192.168.0.1]",
"http://[1:2:3:4:5:6::192.168.0.1]",
"http://[1:2:3:4:5:6::8]",
"http://[1:2:3:4:5:6:7:8:]",
"http://[1:2:3:4:5:6:192.168.0.1:]",
"http://[-1:2:3:4:5:6:7:8]",
"http://[1::%1]",
"http://[1::%eth0]",
"http://[1::%]",
"http://[%]",
"http://[::%:]",
"http://[:0:0::0:0:8]",
"http://[0:0::0:0:8:]",
"http://[:0:0::0:0:8:]",
"http://[::192.168..1]",
"http://[::1 hello]",
"mailto:addr1",
"mailto:addr1@foo.com",
"mailto:addr1 \t ",
"mailto:addr1?to=jon",
"mailto:addr1,addr2",
"mailto:addr1, addr2",
"mailto:addr1%2caddr2",
"mailto:&#xD800;&#xDF00;",
"mailto:addr1?",
"javascript:",
"JavaScript:Foo",
"http://www.example.com/././foo",
"http://www.example.com/./.foo",
"http://www.example.com/foo/.",
"http://www.example.com/foo/./",
"http://www.example.com/foo/bar/..",
"http://www.example.com/foo/bar/../",
"http://www.example.com/foo/..bar",
"http://www.example.com/foo/bar/../ton",
"http://www.example.com/foo/bar/../ton/../../a",
"http://www.example.com/foo/../../..",
"http://www.example.com/foo/../../../ton",
"http://www.example.com/foo/%2e",
"http://www.example.com/foo/%2e%2",
"http://www.example.com/foo/%2e./%2e%2e/.%2e/%2e.bar",
"http://www.example.com////../..",
"http://www.example.com/foo/bar//../..",
"http://www.example.com/foo/bar//..",
"http://www.example.com/foo/bar/..",
"http://www.example.com/foo",
"http://www.example.com/%20foo",
"http://www.example.com/foo%",
"http://www.example.com/foo%2",
"http://www.example.com/foo%2zbar",
"http://www.example.com/foo%2&#x00c2;&#x00a9;zbar",
"http://www.example.com/foo%41%7a",
"http://www.example.com/foo&#x0009;&#x0091;%91",
"http://www.example.com/foo%00%51",
"http://www.example.com/(%28:%3A%29)",
"http://www.example.com/%3A%3a%3C%3c",
"http://www.example.com/foo\tbar",
"http://www.example.com\\foo\\bar",
"http://www.example.com/%7Ffp3%3Eju%3Dduvgw%3Dd",
"http://www.example.com/@asdf%40",
"http://www.example.com/&#x4f60;&#x597d;&#x4f60;&#x597d;",
"http://www.example.com/&#xfdd0;zyx",
"http://www.example.com/&#x2025;/foo",
"http://www.example.com/&#xDEAD;/foo",
"http://www.example.com/&#xFEFF;/foo",
"http://www.example.com/&#x202E;/foo/&#x202D;/bar",
"http://www.example.com&#xFF0F;foo/",
"http://www.example.com:as df",
"http://www.example.com:-2",
"http://www.example.com:80",
"http://www.example.com:8080",
"http://www.example.com:",
"http://www.example.com:&#x1369;",
"http://www.example.com:&#xD835;&#xDFD6;",
"http://www.example.com/?foo=bar",
"http://www.example.com/?as?df",
"http://www.example.com/?\%02hello%7f bye",
"http://www.example.com/?%40%41123",
"http://www.example.com/?q=&#x4F60;&#x597D;",
"http://www.example.com/?q=\&#xd800;\&#xd800;",
"http://www.example.com/?q=&lt;asdf&gt;",
"http://www.example.com/?q=\"asdf\"",
"\\\\Another\\path",
"/c:\\foo",
"//c:\\foo",
"http://host/",
"bar",
"../../../bar.html",
"/../bar.html",
"\\\\another\\path",
"//c:/foo",
"//localhost/c:/foo",
"c:",
"c:/foo",
"c:\\foo",
"/z:/bar",
"/bar",
"/bar",
"/bar",
"//somehost/path",
"/\\//somehost/path",
"http://another/",
"http:////another/",
"  another  ",
"  .  ",
" \t ",
"http:path",
"http:path",
"http:/path",
"HTTP:/path",
"https:host2",
"htto:/host2",
"/b/c/d",
"\\b\\c\\d",
"/b/../c",
"/b/../c",
"\\b/../c?x#y",
"/b/../c?x#y",
"b",
"bc/de",
"bc/de?query#ref",
".",
"..",
"./..",
"../.",
"././.",
"../../../foo",
"?foo=bar",
"?",
"?foo=bar#com",
"#ref",
"#",
"#bye",
"baz.html",
"data:baz",
"data:/base",
"http://host/",
"http:host",
"./asd:fgh",
":foo",
" hello world",
":foo",
";foo",
";foo",
";/../bar",
"//another",
"//another/path?query#ref",
"///another/path",
"//Another\\path",
"//",
"\\/another/path",
"/\\Another\\path",
"http://iris.test.ing",
"HTTP://iris.test.ing",
"http://user:pass@foo:21/bar;par?b#c",
"http:foo.com",
"&#x0009;   :foo.com   &#x000A;",
" foo.com  ",
"a:&#x0009; foo.com",
"http://f:21/ b ? d # e ",
"http://f:/c",
"http://f:0/c",
"http://f:00000000000000/c",
"http://f:00000000000000000000080/c",
"http://f:b/c",
"http://f: /c",
"http://f:&#x000A;/c",
"http://f:fifty-two/c",
"http://f:999999/c",
"http://f: 21 / b ? d # e ",
"  &#x0009;",
":foo.com/",
":foo.com\\",
":",
":a",
":/",
":\\",
":#",
"#",
"#/",
"#\\",
"#;?",
"?",
"/",
":23",
"/:23",
"//",
"::",
"::23",
"foo://",
"http://a:b@c:29/d",
"http::@c:29",
"http://&amp;a:foo(b]c@d:2/",
"http://::@c@d:2",
"http://foo.com:b@d/",
"http://foo.com/\\@",
"http:\\\\foo.com\\",
"http:\\\\a\\b:c\\d@foo.com\\",
"foo:/",
"foo:/bar.com/",
"foo://///////",
"foo://///////bar.com/",
"foo:////://///",
"c:/foo",
"//foo/bar",
"http://foo/path;a??e#f#g",
"http://foo/abcd?efgh?ijkl",
"http://foo/abcd#foo?bar",
"[61:24:74]:98",
"http://[61:27]:98",
"http:[61:27]/:foo",
"http://[1::2]:3:4",
"http://2001::1",
"http://[2001::1",
"http://2001::1]",
"http://2001::1]:80",
"http://[2001::1]",
"http://[2001::1]:80",
"http://[[::]]",
"http://user:pass@foo:21/bar;par?b#c",
"http:foo.com",
"&#x0009;   :foo.com   &#x000A;",
" foo.com  ",
"a:&#x0009; foo.com",
"http://f:21/ b ? d # e ",
"http://f:/c",
"http://f:0/c",
"http://f:00000000000000/c",
"http://f:00000000000000000000080/c",
"http://f:b/c",
"http://f: /c",
"http://f:&#x000A;/c",
"http://f:fifty-two/c",
"http://f:999999/c",
"http://f: 21 / b ? d # e ",
"  &#x0009;",
":foo.com/",
":foo.com\\",
":",
":a",
":/",
":\\",
":#",
"#",
"#/",
"#\\",
"#;?",
"?",
"/",
":23",
"/:23",
"//",
"::",
"::23",
"foo://",
"http://a:b@c:29/d",
"http::@c:29",
"http://&amp;a:foo(b]c@d:2/",
"http://::@c@d:2",
"http://foo.com:b@d/",
"http://foo.com/\\@",
"http:\\\\foo.com\\",
"http:\\\\a\\b:c\\d@foo.com\\",
"foo:/",
"foo:/bar.com/",
"foo://///////",
"foo://///////bar.com/",
"foo:////://///",
"c:/foo",
"//foo/bar",
"http://foo/path;a??e#f#g",
"http://foo/abcd?efgh?ijkl",
"http://foo/abcd#foo?bar",
"[61:24:74]:98",
"http://[61:27]:98",
"http:[61:27]/:foo",
"http://[1::2]:3:4",
"http://2001::1",
"http://[2001::1",
"http://2001::1]",
"http://2001::1]:80",
"http://[2001::1]",
"http://[2001::1]:80",
"http://[[::]]",
"http://www.google.com/foo?bar=baz#",
"http://[www.google.com]/",
"http:////////user:@google.com:99?foo",
"http://192.0x00A80001",
"http://www/foo%2Ehtml",
"http://user:pass@/",
"http://%25DOMAIN:foobar@foodomain.com/",
"http:\\\\www.google.com\\foo",
"http://www.google.com/asdf#\&#xd800;",
"http://foo:80/",
"http://foo:81/",
"httpa://foo:80/",
"http://foo:-80/",
"https://foo:443/",
"https://foo:80/",
"ftp://foo:21/",
"ftp://foo:80/",
"gopher://foo:70/",
"gopher://foo:443/",
"ws://foo:80/",
"ws://foo:81/",
"ws://foo:443/",
"ws://foo:815/",
"wss://foo:80/",
"wss://foo:81/",
"wss://foo:443/",
"wss://foo:815/",
"http://example.com/",
"http://example.com/",
"/",
"http://iris.test.ing/re&#x301;sume&#x301;/re&#x301;sume&#x301;.html",
"http://iris.test.ing/r&#xE9;sum&#xE9;.html",
"http://iris.test.ing/Vi&#xEA;&#x323;tNam.html",
"http://iris.test.ing/&#xFB01;?&#xFB01;#&#xFB01;",
"http://iris.test.ing/?re&#x301;sume&#x301;#re&#x301;sume&#x301;",
"http://iris.test.ing/2&#x2075;?2&#x2075;#2&#x2075;",
"http://iris.test.ing/?Vi&#xEA;&#x323;tNam#Vi&#xEA;&#x323;tNam",
"http://iris.test.ing/foo?q=&#x2665;",
"http://iris.test.ing/&#x1E9B;&#x0323;/?&#x1E9B;&#x0323;#&#x1E9B;&#x0323;",
"http://iris.test.ing/&#x212B;/?&#x212B;#&#x212B;",
"http://iris.test.ing/&#x1E9B;&#x0323;/?&#x1E9B;&#x0323;#&#x1E9B;&#x0323;",
"http://iris.test.ing/&#x1E0B;&#x0323;/?&#x1E0B;&#x0323;#&#x1E0B;&#x0323;",
"http://www.example.com/foo    bar/?   foo   =   bar     #    foohttp://www.example.com/foo    bar/?   foo   =   bar     #    foo",
"http://www.example.com/foo%3fbar",
"http://www.example.com/foo%2fbar",
"%68%74%74%70%3a%2f%2f%77%77%77%2e%65%78%61%6d%70%6c%65%2e%63%6f%6d%2f",
"http%3a%2f%2f%77%77%77%2e%65%78%61%6d%70%6c%65%2e%63%6f%6d%2f",
"http://%77%77%77%2e%65%78%61%6d%70%6c%65%2e%63%6f%6d%3a%38%30",
"http://%A1%C1.com",
"http://www.example.com/%A1%C1/?foo=%EF%BD%81",
"http://www.example.com/%EF%BD%81/?foo=%A1%C1",
"http://www.example.com/ＦＯＯ/?foo=%A1%C1",
"http://www.example.com/%A1%C1/?foo=ＦＯＯ",
"http://www.example.com/ＦＯＯ/?foo=%A1%C1",
"http://www.example.com/D%FCrst",
"http://www.example.com/D%C3%BCrst",
"http://www.example.com/?D%FCrst",
"http://www.example.com/?D%C3%BCrst",
"http://user%40example.com",
"http://user%3Ainfo%40example.com",
"http://user@example.com",
"http://user:info@example.com",
"http://iris.test.ing/&#xfdd0;foo",
"http://iris.test.ing/&#xfdd0;foo/bar",
"$://iris.test.ing",
"a$://iris.test.ing",
"http://www.example.com/foo    bar/?   foo   =   bar     #    foo",
"        htt&#x0070;://www.example.com/",
"      &#x0066;&#x006f;&#x006f;bar&#x002f;foo&#x003f;bar"
]

function test_unsigned_numbers() {

    // test unsigned of various sizes
    
    console.log("test_unsigned_numbers...")

    for (var bitlen = 0; bitlen < 161; ++bitlen) {
   
        var schema = `
        {
           "type": "uint8_t",
           "subtype": "uint16_t",
           "payload": "uint`+bitlen+`_t"
        }`

        var x = null

        try {
            x = new XLS10(schema)
        } catch (e) {
            assert(bitlen <= 0 || bitlen > 136, "should not have an issue creating a uint" + bitlen + "_t, but produced exception " + e.toString())
            continue
        }

        assert(bitlen > 0, "should not be able to specify a uint"+bitlen+"_t")
        assert(x != null, "failed to create XLS10 token for uint" + bitlen + "_t")


        // try less than minimum value
        try {
            x.set('payload', -1)
            assert(false, "libxls10 should not accept -1 for an unsigned int type")
        } catch (e) {
            // good
        }

        // try 1 more than maximum value
        try {
            x.set('payload', 2**bitlen)
            assert(false, "libxls10 should not accept "+(2**bitlen)+" for a uint" + bitlen + "_t")
        } catch (e) {
            // good
        }

        // try min and max
        try {
            x.set('payload', 0)
            y = new XLS10(schema, x.tokenize())
            assert(y.tokenize() == x.tokenize())
            assert(y.payload == 0)

            var max = (2n**BigInt(bitlen)) - 1n
            x.set('payload', max)
            y = new XLS10(schema, x.tokenize())
            assert(y.tokenize() == x.tokenize())
            assert(y.payload == max)

            // test a range of numbers
            max = ( max > 100n ? 100n : max )
            for (var n = 1n; n < max; ++n) {
                x.set('payload', n)
                y = new XLS10(schema, x.tokenize())
                assert(y.tokenize() == x.tokenize())
                assert(y.payload == n)
            }

        } catch (e) {
            assert(false, "exception while attempting to set min/max of uint" + bitlen + "_t: " + e.toString())
        }

    }

    console.log("PASSED")
}

function test_signed_numbers() {

    // test signed of various sizes
    
    console.log("test_signed_numbers...")

    for (var bitlen = 0; bitlen < 161; ++bitlen) {
   
        var schema = `
        {
           "type": "uint8_t",
           "subtype": "uint16_t",
           "payload": "int`+bitlen+`_t"
        }`

        var x = null

        try {
            x = new XLS10(schema)
        } catch (e) {
            assert(bitlen <= 1 || bitlen > 136, "should not have an issue creating a int" + bitlen + "_t, but produced exception " + e.toString())
            continue
        }

        assert(bitlen > 1, "should not be able to specify a int"+bitlen+"_t")
        assert(x != null, "failed to create XLS10 token for int" + bitlen + "_t")


        var min = -1n * (2n**(BigInt(bitlen)-1n))
        var max = -1n * min - 1n

        // try less than minimum value
        try {
            x.set('payload', min - 1n)
            assert(false, "libxls10 should not accept " +(min - 1n)+ " for an signed int type")
        } catch (e) {
            // good
        }

        // try 1 more than maximum value
        try {
            x.set('payload', max + 1n)
            assert(false, "libxls10 should not accept "+(max + 1n)+" for a int" + bitlen + "_t")
        } catch (e) {
            // good
        }

        // try min and max
        try {
            x.set('payload', min)
            y = new XLS10(schema, x.tokenize())
            assert(y.tokenize() == x.tokenize())
            assert(y.payload == min)

            x.set('payload', max)
            y = new XLS10(schema, x.tokenize())
            assert(y.tokenize() == x.tokenize())
            assert(y.payload == max)

            x.set('payload', 0)
            y = new XLS10(schema, x.tokenize())
            assert(y.tokenize() == x.tokenize())
            assert(y.payload == 0)

            // evaluate a range of numbers -100 to 100 or nearest allowable

            min = ( min < -100n ? -100n : min )
            max = ( max > 100n ? 100n : max )
            for (var n = min + 1n; n < max; ++n) {
                x.set('payload', n)
                y = new XLS10(schema, x.tokenize())
                assert(y.tokenize() == x.tokenize())
                assert(y.payload == n)
            }


        } catch (e) {
            assert(false, "exception while attempting to set min/max of int" + bitlen + "_t: " + e.toString())
        }

        

    }

    console.log("PASSED")
}


function test_strings() {

    // test signed of various sizes

    console.log("test_strings...")


    for (var bitlen = 0; bitlen < 10; ++bitlen)
    for (var charlen = 0; charlen < 27; ++charlen) {

        var schema = `
        {
           "type": "uint8_t",
           "subtype": "uint16_t",
           "payload": "uchar`+bitlen+`_t[`+charlen+`]"
        }`

        var x = null

        try {
            x = new XLS10(schema)
        } catch (e) {
            assert(bitlen < 6 || bitlen > 8 || charlen < 1 || charlen > (136/bitlen), "should not have an issue creating a uchar"+bitlen+"_t["+charlen+"], but produced exception " + e.toString())
            continue
        }

        assert(x != null, "should not have an issue creating a uchar"+bitlen+"_t["+charlen+"] but constructor didn't fire")
        
        for (var i in test_uris) {

            var uri = test_uris[i].replace(/( |\r|\n|`)/g, '').slice(0, charlen).trim()
            var hascap = uri.match(/[A-Z]/) 

            try {
                x.set('payload', uri)
            } catch (e) {
                assert(hascap, "should not have received this error:" + e)
                continue
            }
            var y = new XLS10(schema, x.tokenize())
            assert(x.tokenize() == y.tokenize())
//            console.log("y.payload = `" + y.payload + "` "+y.payload.charCodeAt(0)+", url = `" + uri + "`")
            assert(y.payload == uri)
        }
        
    }
    
    console.log('PASSED')
}


test_unsigned_numbers()
test_signed_numbers()
test_strings()

