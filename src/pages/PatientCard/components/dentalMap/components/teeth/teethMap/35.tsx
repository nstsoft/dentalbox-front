import SvgIcon from "@mui/material/SvgIcon";
import type { Segment2, FourZonesChart, FourZoneTooth } from "@types";
import type { FC } from "react";
import { TOOTH_SVG_STYLE } from "@utils";
import Implant from "@images/tooth/implant.png";
import RemovedIcon from "@mui/icons-material/Close";
import Crown from "@images/tooth/crown-5.png";

type TeethMapProps = {
  tooth: FourZoneTooth;
  onColorChange: (tooth: keyof FourZonesChart, segment: keyof Segment2) => void;
};

export const T35Svg: FC<TeethMapProps> = ({ tooth, onColorChange }) => {
  const style_1 = { fill: tooth.segments.c1 || "none", ...TOOTH_SVG_STYLE };
  const style_2 = { fill: tooth.segments.c2 || "none", ...TOOTH_SVG_STYLE };
  const className = "tooth-svg r b 5";
  if (tooth.removed) {
    return (
      <div className={className + " removed"}>
        <RemovedIcon color="error" fontSize="large" />
      </div>
    );
  }

  if (tooth.implant || tooth.crown) {
    const alt = tooth.implant ? "implant" : "crown";
    return (
      <div className={className + " pathology " + alt}>
        <img src={tooth.implant ? Implant : Crown} alt={alt} />
      </div>
    );
  }
  return (
    <SvgIcon className="tooth-svg r b 5">
      <svg width="21.44" height="61.12" version="1.1" viewBox="0 0 21.44 61.12">
        <image
          width="21.44"
          height="61.12"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAC/CAYAAAClmmERAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz
AAAuIwAALiMBeKU/dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURB
VHic1X1rsC3Hdda3VnfP7H3OuS9JV49Y15KvbMvyIya2TBw7DxwnroSKA0k5IUAIZSD/SPEDqigI
UK6Cgip+8N/84g+VlKgUBSFJJciooofjRDKxJCTZdfNwLAcby7qS7vPsme61+LG6Z2bvPfucfc7Z
+8pple557Dkz3d+sXu+1GvgOGt/85rO7+swz4c16Pr1ZDx6OS8//7idm+/E/z/b37yBinU6nj73r
Az/0o0Qkt3IebzoYL3zp8Z+fXbv+nzSJswkpQITp7s5vP/TBj/3YrZzLmwrGpWc+98C1/f0XVbRS
BZQBEoAcwRHJZLf+1IN/6eP/9VbNh2/Vg8bG9SY+kVIGAgAE9nqEoGBOkf7DrZzPmwbG808/+s9j
09wDKFQVgAKsAAAiBZEiNs29l5793Cdv1ZzeFDAuXfrNOs7af6YAiABitq/KUAGUCAQCCD5G+se3
al5vChizy5N/m2K7x8QQBVQFogRAwY7AIBARAEZsmof/8A8fO3sr5vWmgBHj/t8DEZIk4+BEYAJE
FWCjFoXCmAimO0k+dSvmdcvBeP7p3/k7sU1noApmBnsP5xggBisZJyWCMVWCErEAP3sr5nbLwUit
/rKSkoLhQ0BdV3AhAEygwCAwiG2bEAQqirZpHn7sscf8tud2S8F46fcfvT228QFSQqg96p0aVVUj
hIBQhcI0oWJSRUFQVYjo7r23yY9ve363FIyo+KcC8cSMyWSKKtTwlUcdKlShgg8ejoseqCAlMBHI
cWhb/fi257d10huONrV/U0WNKiY1wJlHOAdPgGfCbDaDpBYiGRQFVJUQ9aPbnt8to4xnn/rtO+Os
vYeIMN3bKSIDSgA7RhUCyDk47wH4LGUUQnZRi3hRH3nEbXOOtwwMcvxLIDhyDj6EzipiEFQFzjtM
JjV8CGAmKNiUUhBACo2689Jbz31om3O8ZWCIyKdUgd3ppKOKAggRg4hR1QGVZzhHIEqAmrahdpFP
JFvlG7cEjM9+9rOhbWcXQYRqOuk/MH4AJsAxwbuAUE/AzgFgkyYAyK7zSHh4m/O8JWB873e/5ZMp
SeUdwznXUYTmz4kISubL8M7DOw9mMv1TFQIBCEgq797mPG8JGOSmf1cB1LtT+0VGgQmmYIHhmaFE
cN6YKDGD2ewVIptmSnL3NpWvWwJGnDV/mcCo/MC9mdkGg2zRRHDsQESo6gAODpp5BueLVaW695R8
97bmuXUwXv78I9M2NXcQ1NTuMhQgNRuEKStX5MCO4byHg4NjAimQIFAomNi1kO/d1ly3Dsa3cfqn
kNT74DPZ90OhIAbYs5nsBDAxvPNwweVrivgFQPDtLL1vW3PdOhjOhZ9RVVRV3f+SCAoy3wVlfYJN
vBI7gAmV92B25gVUBRGMlKB/ccFo2/gBKIFDfpQRgClWCoAYznHmqQSQN+rwDi44EJP5OZSgSlCV
+7Y1162Dkdr2LiUgVBUAZA8WAFUwMZjUzHb7FOw8nPNw3oONHGAyxbzGrcjZZ7YUaNoqGH/4e791
f0qxcp7zkqhXLrK7j9kNZmFilJyH8wHe+U6sFkhIECbp21vRN7YKhqP6FwQgIob35vQtGpc5tAiL
LJXYgdhAcN4cPYApYAoATE6E3ruN+W4VjAT5OFTgg0dviAxIg0yK9FvH7BTnKjjnUYUKLgNGOZxA
gAPwrm3Md7tgtM2DTIwQKiN3Mm0TgIlRZAdwvl4hIGIw2zZh58GOoVCo2HRFlVXTXywwVJVj096m
IDiX2WOmAFU1zZM4i9QeDpuVB3kP9h7snIlfyhtFCQA9sI05b03P/9LTn/tgkhTgCL6o4b1lBgVZ
8Eh7riFQKAHOOTBXcJ7h2Nn6mXLkQNBGvWcbc97eNhH9WyIETw7sXQ6dkWmdUBDn74e+q855wWAO
8C7ABwdmNh2DjGtI1FPbMNi2B4bqRyykznBsolUzaRgvVHjHmEsEEAVUzGJ1Hs7VcC7AM5tnQzVf
rv7unXRx01PeGhipbe8HgFAWXOKnqiAQTAsf8gsAEKhYKJ6cA/vK/B/cA2lsFm6G9M5Nz3lrYIjK
WSYCBW87BDTHQE1gylKCiGZHDpGD8wHVJMA7B5ddhaQEZnKUdONMdCtgPPfEE+dms6YSELzPwVNC
9k8YqZPmqBnPT0E1dfoGO+MbznuATPEy7xcITO/Z9Ly3Aoar01+HKhiAZzdQxbWLpSJTizGQwcjR
NBCD2IPDJOsaZr8Ukw7k3r7peW8FjEjyV1Qpv12f+UU/qLj7RpKoVGJ/HTs4X2WfqHm+RLMIjvEt
m573VsDQKO+1KDtA3qNAUZhg0ciZlx8vmlDymYgcfKhR1RM4yozXboSY4u2bnvdWwGja2b0gBdj8
mkXHKBSu5eex/DpFliiwvA02BsrOdXoGCIit7KrqRue/FTBSG8+qEjz7nJ8FdBoVAYWfjGEhSL2m
CgK5AD+Zgl2xeo1qFBL+z+O/s9GtsnEwnnzyv51qYwxggBx3DhoAHdM0/sljWABJoWp8gwYi1jmf
FTdkoiNuK31wk3PfOBhn672fgCqRAN55oChWmTCKH4MZWPRm2BCIlsRgE78h1PDewgiWFgmIKk18
9T2bnPvmt4nyD6sIwNoFicwm6dVwqBG7jpIGoCmh2ytEcG5iwWoQlDSDRVDZrHN442AkEVOGFGBv
tlRx2WX2ZxYr0QrKQLdNUP7aeYRqApepwyYtENDbNjn3jYPRpvaC6U3GGzj7MHvlqhe0BB27BTS1
Q8IAO4+qnoA9QUXyNgFiShs15TcORmzaswTAuZCDzHmbZItTYdm/AFZAAYhEs1EAFH2jmkxQOYvB
atZFU4rnNjn3zVNGjFPNAsQ511ulZacQOt/nqqEigA6qK4gQfA0m128tFaTY7m5y7hsF44UXXthL
KTpCJm/uXf1atonmfxRLRloZggQdggEC+xrOOzAVnwchphieffa3NwbIRsFw8coPS7JFM3PO9iV7
yzpgAqpG7otGWhlJjTcMPne+gp9U0CyZsq+Had9tLCq/UTCaZvZR4/KWtEbMndrdVQ6U2AhGFdA8
ZN5gIwKxRxUmBnLmoEQEX1cf3tT8NwqGiL6nSAvnuDPIdKBEFYVjfhuM3SvN/UzkUNU78OztNjlW
SwnfmZQRY3M/kN84OQOko4r8wOwPPYAsAAAqLebkDQE+VOBi+ud8sJRkYx6vjYKRYjpfFh5M/cyf
9IvS/B/RwSmdmtqF3xCqegJkK7h42aNuTtfYLM9o29OqZHkVWVIodN6ZpZaOQDhsm8Q5iiICfDVB
HRxYLQwnADS1t21q/hsFQ9u2ggpUAHKuE6u9zqBd8omOufyG95I0r2uAwFyBQwBYoaJwAJqm3dvU
/DcGxldffOaeNkVzOjjqA8qq/RvOYnGVTTIcImLO4cEgZoS6BnIMRkBo2xh0QwGljYGxP7v5/ZpV
T2YAZHpE5xEHOt9ONw7CRNOSrkHsMKkqVJ0rUSEq9JXzk40kvW0MjKj6PlWLebBj+C7VQFcbIYcM
TXHpd76adKa/SWkFC2+k4mBj8Upp5QHTr8TM7DBQw6kH5Ci4iC6CQQj1NHu98s2UkVLz/hMvAJuk
jBQvqAIQsgCRDkRnlzSvKELRxsG8Y1m8AlU1yYHsIqYFKcWN6BqbowxN57vAEBE4YzHc95qVcKL1
6ENSUbz6/A7na3jq8kIBACnq3ZtYw8YoI7VyVsTCA0xkAXUMmGfn5VKoHixWyxCNS/uKnYevQrZR
TLttm9lG/BobA6NN7R4pQSFwXALFwzSCfkuQKkbDaQtDUho4efLfsof3oWPOTIQ2xp1NrGFzlBHb
WounlxlwC36MPAjU1bwfOiQt6xrEqOoK3rkcagSaZuZfvXTp9EnXsDkGGqNHzsghl7WAonB1a8+V
RYK1tgmgObo2NNgsYY6JO4miqrghr3//SdewETBe/tLn3xLbRKWMiojRe8SHI1ucRFklP3yYjTL/
u+DrrO4DUHMQz2bp+066jo2AcVXjh6wjikXQXImVFJfU4lCdz/88aIyIV1/X8MFyyZGdPUnSiRNl
NwJGatJ7BH32v0mMLlttMDI1lDi0HGy5AkYZi8P7GuzMW6bJrOI2tieOoWwGjKQXs9PbbkrFATOy
TfJXEV1HoEBSgyGoRAQXLJvHHEUASBDbeNdJ17ERMKK0F1Q153QyiCxE0IUUO1tCkUSgkjpv1WEj
pWZ50q5G5XotlMihadvvDGmSRO4s24O4ZAT3ylZRIrskN8odVNYw5TXJEoWR84NiYAsdNM1setJ1
bIYyYntOUo4PEXISK+YXMci56GOHa5CGLsZQbKt4diDyyBksaNqGXnnlqydyAW6GMmLaM37RhcxG
33kRhb2TZ72xDIaDqwKczwEHBiCKq9/61g8cexHYFBhtnNp0qWOeJkvm37wWUZIpRmQNykB2Ac7d
i+CDxXLVyqEhUETRE1VEbwSMNsUA9JHDlYyxc/Ej2yzr0caY4lX5AO8DHAGi5jaIMT50zCUA2AAY
ly79Zh1jcpmPmTrODMyp4XkURkplM603NM2WfsfeYigMe5YCiO3+fSdZy4nB+Maf4QEVIVOyZEHZ
WjTSirJluZxySFStDI1p6XfMAcF5KHNHcW2M50+ylhODUVXy3VZNpF1Ko+oyvyiRxc6zLev7RkXn
VXJzK3qrYQPylhO0zcl0jRODocm9x/jAoORy1B4pX3o5ImtZrkCUuHRPpgq+CiDHOR2f0cxmk9Eb
rDlODAY5PDC3K7JJveqtZwc/SqnFWiMu2yfkPbz3cMSde6RpW/7al7/8XUddQxknBkNiegvQhxHN
5zlyIQ2+ySJWiyfs8KcsOYmYHLyzFhNwQInkzdKVY/s1TgxGSnJnl6eV1yliWuNijLX/YikJZmSt
SR2LKjmzUQYTVErmoCA1zbH78pycMlI8y4Noe0kL71Ok8yhrzr6M4jBeH4wFyUMOzA6+lIlns1lE
jl3muQHKSLsKgNTKr1RMs9TFjNcBLqZ5mkRZx6cBjKjkWWEJ3oEcdUZfG9u3HnctJwajTakGNPfM
yRF2WZGZM8xRWdeGz2MpulYS6LwHaW//xvb4usaJwFBVjjH6Ps3V/lEZEa/DsGu+Roflzoc9Ky0q
XgT2jMo7gK0+iZkwi+2Z467nRGA8+uh/uRcqbE5gFKMDUZY1xm5kNdQkiRzBWItLEsWRGWueXQdy
3D++rnEiMPamux/udOy8h0tLz5U8o/BMMlG8otBiaeiIL5TZWXTNucxECW2K/MpXXzyWX+NEYAQN
1jVlqH4nNZIetTvKdlJACaICWZNvjDJaZjjK3Zz6rSqvX3v1WKb8icCIEh+yNESY/5MAJUUSRRyV
EsU6oU4VX5kYu/SX85RBZO4/F6pci6JQ6Beh+pXU0g8eZz0nisJLkizGKNeX5L44WQvVrFMsDlPS
2JioqGmQhz1riQ8RmBwckTjHT7Pj04jyQSFARP74OOs5ERhtSufN2ydmsRamCIUmAVXzQJRLjG+U
gl8dfLB6jGyTV4nDC87TvezC96oCYIAFiDEeS9c4GWW07SVifkVFHiJQXZogiwiSRKhWc5QxXK6I
ginbHCKHaqJ5O90A8DyMQXwPmH9QQfBsdS0p36dpmzuPs54TgRElflRVAoB9gj4L4A0CzkPwThFd
Jv7cW9wK7wRggkh2gHWtZgap1VAh4I9E6BtEOA3ouwHqktlKTNc6N1llvUIhUU4dZz3HBuPXf/3X
d2J7xWf3xARE7zeGLpCkN1TxNQheg9NIYA/FaSXZUZAHdI+Ugoo6Fb0iqldZ9QYB+0p0kxSeiG4T
xf0KfScx3jmMv3RgwLot+OAAYhAilAg32/1j6RrHBuOu09XDr17W0vuhU68JAFh3RORdogoH11Uh
2YTte6vpIwCYQnFXt0ZRlHRoq32lrqvCUngh56EHslY0DaxAVNroXnnmmXvOP/zwN46ypmOLVnb0
Q6V0rsvRotIPRJFyognlFhBloZl4Ogaq2ZYpniEq/f8yIdiuoS4kMBxdQr53uSUN5Xs6vFHvH1m8
HhuMJPKBYpz1QSPu3mRKiihqZxCUtRbbTAFC7rJkrmF0/vKB38MkhPZ/v2Tv2PXe5QQZYtNoWRDh
P3jUNZ0AjHTReB5Zc6C8BLNWxYJcpT61dJMphlpXkAOUyLQuKGGdlj9n6i4O832GElCCgJxJ62Y2
O3LnlWPzjBTTXdYnWy1kyrAc0Oy4SZI66bFczWt2ibEbyv7Qkl5AGOyUjh+NehKJoLn4L2T7REuH
SJEj+0KPDUbbzM6AtGCAUuPe7QfNWqNgnv46oWD/igiiRLBmY0v74osufdb6VY3Ow3LpvDHnnK8O
EiTRO466pmNtE33kERejVJR3fFlkcftBzYslKkiFV1DWJaj3iWsqVJMNrhyr7fiKEuYSxZdG/ozE
usoS56glQWM8sq5xLDCefkt4n6hwaR/TbQKlrlBRkeMiXdggs1rKT2Vkpme2TCpFwCQWNmST2pwz
Bzs/5+ICyIHJI+RSc5B53ZrUHLnE81hgBHf6R0rvG6aFRZJ5nJQkt7vtHRklMTifbWNSRwREuSgn
q6OSM/iK2LWuCoNmicMFMINY4SsPH4psA2KbqqOu61hgpEY+arKfM/NznW3BJegsQMqq9XB7lIIc
0Z6mVB1EKKc/mTZpu4s7h9Gq6JtKdgy7kNVzAyNJci+//PKRsnmOBUbU9KB1OcgWJ5d+ONRlRxOs
M7RJFmRnjilRUtIec4ihC7uSA7RUJVAvgoW6fsKLwxJwKTc0GjRhFcX1N77+ga2D0Tb79yiVqGlR
lG2o2ltMYiq3ZJ9G1yYil3dSJwa5k0JmzZcEOQbIgcCWDaw99S3AAVWC86ErKiYy3celo1VDH0u0
tjHuMrjv3pobkGnWEaz1bX5TXHTTIlKKkgUoGKJ2YpZo7sVVtllBNitdvEK0IrfR9N4huICb2O/0
E5HmHUdZ15Ep46mnfuO+to2hy63oK7zB+e0qEZwWdpd5AOWDGIRzwIlzLVuuXGIGXAHMrrUOTEYh
0nGDBSzgYF6v3Ig5g0ZMiKoXjrK2I1PGFJOfvMHXrTYs6wSdgklsNfDg/L1FyW0vMwDJi9OuUsuR
6xxCms9dBHLGoN0ygzXeUNpaVTk4by0qLDXC9A1JR1O8jr5NHH2fWeNUrO2MgzOfpLOO8tWkhvcB
flIjsIcygVQ73aPrC0oEc4IyKPcctxvCFK+izfD4NrHLzN9n3Z/MGU1KkCRHSl45MhjNrHnI9rwY
oxO1swVyB3nvcte1KqCaTLvOBqaZkiWkibW6LNF6kzpZqeoWXZiyme9dwfAIHHZSH+fuT+Z5JyW0
7exIWujRwWiaCyCyfU+ACwGhqixj1zk45+Cch68mcFUFxz63j6COITIplC3onCQCELBa02TJ6jSy
uCzpTqsoQzsLWKEpU1ruKhtFjlShdCQwPvOZz/imjWeyeQkih6qq4CvbEgTK1MHwjhHYZ9J1eWtk
fuCyZuoYTtmC1UXX6MCw73kAzNgg56DR7ldVFdhxr/lG3Z7S9clP/ODHoeqLrcHM8KEc6uS6MB9n
LZK4dHAb+CjKIsp/7HJr7dzGapWXfGWfHkubdq5GPZ3ChwkSG4W0ItsDQ0R/rPgioAqfo1lcJlre
PhEcF8my0jNjQ82W4dJpaUX4ZCXPyJYhM6EKldWvkW1hVanH/2h8HAmMNs0+1NnXzKgrowjDoRhu
+cbMg9PyDhhFGtHAXB+9bvwzTZqbCBhfCaGC91w0Yf6T559fuw7laGA06aJkpbDyAc6FbIANVHLK
lqRzEB02Qh6uAB0IhZIAWFn3uAGygsLMZ1LUecdspjyVPueKq298+23rrm9tMD772c+G2DZ3MEyj
DlXdVQJ1aeBslqZjy8QjFM/36DpsncVLBnSncS4OcrySMtB51+0guhACgjdQnWP4EC6uu8a1wfjQ
ey/+pCYNUFOTq6ruLUTkZHbYaTbGR9xcFdL86vI6MNAm8sk3GOENxKuFXn+Cp3WmdT6AqXR5IySN
a/caXhuMKPjpEiQKuVUdlRoxlDdsDddD5ZE7/a6+4YAiOr4BLDcyI1qpY0CBYa9YRa42CL4zFSKt
f1LO2mC0s+ZhYoIQECbTzoYoqyAA3jOqqs4q9ZAkFkApSgV1zo9MGdnSHWwJIu68aUuj86cO+i4w
IYSQD3sAtKW1veRrg9E07QUo4NgUrfJK+pOIHbzzCMPjwUB9rGR+Fd1XUiuTsLJwzuez5jZ4I+As
LYAIQ+CJGb7yKA1ZRdavalwLjC9+4X99MGmaAkCo7JgNlO2dX653jKquBxPXbgvMS4L5hZUEWnaU
/ZnOdA7nO90D7FYDMuggSQB8ligumMgXTWt3oV5LHddWfoEEABOqalreI0qnZ3ZsFmqegC2S8tdF
vAd0ktFi8mDyHQMlmk98O0hx657T/8IOfGCHxtTytVMh16KMmNqPgc1yrOq6a4Vb4iQ+d0niwcK7
6MBKlbKfPDmTUGVLFDWd2HXbZeXQ5YaJPvh89JBCUjz1zW8+u1bYYC0wZrPm7QSyPG02z5Kt09Tg
UNWowoDIOqo4oN49U4XLx3eUwuDhx4QDbJXuUZl3dT+TnewZQg51Er/659fXqmo8FIznnn7yx2OM
UxBQT6YoqkAxvZzzmNT1yMsbIe4FAUNZipiYHkonOpgahrfkobZTNFlGyDVsICDGuBkwZs3+p7M/
G1VdcrRsi7Bj1HU90ma/xAcX1HEdfkOdyT/cXnMgrAEK5RMuhhuFyI4eCuxLVeNaeaGHgtHO2u9T
MicOs+tioyBjmvUYVVCnTi3Th2lW2YbJZy+WxiCrjLEVfIeKuwDl9WR6JUZVBUiue00S12rJfSAY
X37yyVP7zeweAlBnZcrlakEmwnRS9wpR5g/Dg+LmgOglLlAOYeB8UO1hW+KAtEge0U6JrF1mVRkf
i228+xuXHj+02uBAMG64+IsQcYAxSTBbKQWpnUpT9eFM7hQk7rTJuTc9tFOUshTyXUjwwKEHJOYP
tmgvoAjBe1Qua6Kq9OoV+tnDHnMgGG1sf4rY6sDs+HICZU/2znQ6sDyLx8pMd86SYW6RRse9yCW2
6Jor3vD1GObioKyxLg7nHKra3IBKhLZt/+ph9zoYjLZ5LxT5hDzLFyGnmFYhn3SVJ8Tca4/cb5u5
MTDZiyeMeJWfYnkclGO+eCguYBG4oZshNu2hcdeVYDz33GPvapvmrEmROl9qOkY1mU+zZDb9o1AG
lgy14Y+EUqe20gA74nCu3659gAGo6wk8B0AVSfSuP3r+Dw6MsK0Eo71Ov2R6gLV1KY6XyWQytwgi
6s157j3TBy2z5Fv0bWJOBgp5P8pjnXMItaU4qSrdvLn/8wfdZzUY7exjULKeWGxhO+cYdTXvYy0g
dJKkS3xd3iaFXxiPoTnmd9g4SLyWzveFR5crnfPmhMo5pynJJw56xsrZzGb7DwDm3rMGg4Vpzk/K
DcxtdHbEOGUMjaqiOa47xjpAdvctCW6YF1rOO4QQ8tmPhP1m/8BWmaNgvPTM735CW6mIyOrNmRB8
QPABi94Jzs3DjC+WzrArFtRxUR5xAB1/2MtyS89lAibTHTs4VxWa5NxLzz2zUgEbBeNmk36WmOyM
dvZQEHb3dpfdeESd4db/f8Ckc+qSY+r5xSYGmRtgeQb2EqvKLG1mQprd/NurbjMKRkzxw0pAyNkw
k2D+gUVP9/xZqzZEZFwFL0/L1mp3zYYkCgc/52AuowoBdT0ByMKYbRt/eOU9xn7ZNPF+BsNVNUDA
7qniDljmF0vUIGmljmE59Tlf8xggHGijuIChRTT4FPV0ipAPmIppdSuaJTCee+KJizG1uyAghGDn
LLNb6vQMwE7P658JjInVuXnlqboD/BzHHJxfTO8ELI8kTCdTVFUFBZCS7L34v/9gtOJgCYxYy6cZ
xhiZHfb2VjuJxkz3Jb6iCz8Qurr5o46D6uaJCOxHMgLJ0qnr6cSyiFih0vzc2D2WwNAYfwhkgeC6
nnQLHmscNhYMXiLlBcrIZ6Adi1WMFfoO780cRiUZO8bezh6c91AlzGbNepTRNPGdgG2RU3u7net3
6Q9HTOf+HNbhL/vJAsje7tVrOskoaQ06+L+MelKjriuQKpKki7pUkr0wrUceecSl1N4OYuzsTFEU
iLEGKDxiKarIErXMeaCy8OuTVzc3bJuEORY69Ks457Gzuwv2DlHT9MtfenypmerczN/3tgs/oCKe
AJw5c7a/rS4LLTfMy8wqtm2l+esW3J7m2Nkw8yxjkVq7F5gt5d2dHTgOYBCS+L+29PfDHxqNP6Fk
Xq1SuzF0pw0HucUHW57E/EWLPx6h6dCKcZApXw7KHj5/zmvuA6bTGmAgtc1HFv9+DowY2w8REe64
4w4Uch596MDHOXzyErefi8Jr7xpcuZwTjsz4+xnND2aHU6dPgZXRpuVDLOdWm1L7dk/lYCf0yI40
/xmZxyHaZA/gOn1AV43DGgnw4LBce+rg+USYhArTSQ2R9o7FrJ4FMNId5267fSGD/3BJQoTVbaaW
zJnVmXvrjAOt18xEx6ZQXhYx49SpUwCUmvbaTw+v68B44YXH352SViWg05GzLr8Nt7QvLd15deJq
f+2oAbHBMeotL1/zNt3Z2YHzATG2H5/72/KNXPc/emrvVKdMlYjZGPMcy/Bf7tmJ+U1LMK/4ilSl
TQ3b4tznlc592Iv1c6fOICaZ8290YCTEDxXdYo7JjbzFpcXoitytufAAQKxlTx1lfUcalkrF+ftx
QECEvb09KNKFz3zmMx2Z93Sd0jvt2uGbG6HpLrzYPR0AjbezHIYH8u1K4c1JxoFMlHK5Bi0DUSxm
C2syptOd+m988hPdVunAOHX6zK7dayGtYOlZKxZyAPOk/KTyt1tkGQAA5t6cX7Sgh8Gts2fOQIi6
eMowPey7gDLhgSxZVMMXxephKxsQ2bC0e5ujKIRlanNTHFC+dx7Q1LkBG3c4VwAACFZJREFUGQBe
+IPH7haRs3YtzS1g2ec5b5MYC1hhWnce2qLYz+dSHHccqIUOFK/eNlm8pnch7Ex3O12DAeD0+bsf
7C9csibmxpL+nyd36AIpu162qYHmYdLuYL5Slrm7u3PfY5mJMgDEtn1weOGBDxpuk6F3a+zvhpxT
kV19J+cYh7azIquBGxOvPQO3+TLR7l2f/JGHgQwGs51sedCJ3N3NlhatEEmH/B3dEooYPM3iBDQi
XovZMFjHmdNn3g0UBhr5/vk7HfqowU/jpvvy0LkvJxqHUkY2MnXBViwfY/6lTqfTB4AMhqjcO/a8
teatAGS9azcmUtdQ2nhgUqxSvMpIIheBAobISBbtMhqrurEtnmg1/0f97TY39FC+0VvI45roXFoc
8X1A2Saqp8ol80rn8i0Wf1eqkkZ3V2eYDbfIJjjHGsjS3Jflpw6JQ+UCkMFQYKc8ZGXf8Pz5ojdr
8Wivg+Zcmg1tWwMFMLcNVoSehj/co/qYNzBkUOV3wExVFSm2cyS65Or7DhlzR5tinMbLv6pw+JO3
7vLlP/7jM8NTI61F9molKrYtJPVdWyVFHIX0aUSrPc7ozmhb8ZmxvH4dY9uk20oEXK7llL/qr3dZ
9502KVasryO6gaogxiafx8pWI3YEMNZvvH6E+43MMaUyr8GBAIoOnuGfKYCK3C5PJnddH9wFIsn+
TymXaEv3Foq4TSkhxTZfo+sRhhZxXQ7APhkgKuWk3+HJGfYiNUZAo8m5UnuvOgBCCjJABkp8ir5p
mivzDxGkGCE8Fk7M/gBmqAi8ioFxhAjZyrq1ow6V7F0z34UQspMpoW1m9hKHHamp/KMd9aOnEjlz
59v/3F+4cOHmpeefHkxWkVIEVgiJAgg7h6TJIvS5Ln7lKBPNfnEVsVa7JwEl07nCCuhVjZoltZCm
gcQWmhIUllivRax3vEa7rUI+fIOI9kvNdYTqeoU4mh+ct5LkRPbS3Xk0USWb8QRADivkWxOIAoV2
HReiUYqU05ko19YqQA5UBINKH98hArgCiB4Dip7RxhePw9MUghhbxGaG2Da5BcSSctENyT2DR5u0
r/VA7YFQ2waSIiS1+Rx5BXL2IZjBPlgvnqJ+578XUYgQ1NXI1VSPdmDcvH7jXzY3r+W2+kdCI89R
EGNEbBqk1EI09W+/0/J0oOAOxOI6DxyAoDC+IJJBSJkiYI4ndgGuqi1LkV0X8LLtL3jtjat47doN
wPny7G++dq351Q6Mr/zfb/9GSvLFG1ev4PXLl9HG9hjSzyRRbJusi5RjPRZBWc4AWg+ErAOlaNQQ
Y+eEZufhXDAwSjlXdkKpKmJscfm11/DVr30N12/cxN7uXrGzFKr/4B3veMdsOEU8/3v/8yFRfjqJ
7F554ypc8Lj99tsRqtWN0Ar5+eCXPGCcqxC77OF8rcvF+1U96YNRI6GHHuIMYEmjyt3dCMgJuaWO
rdhJAklGpTeuX8Ply5fx+utvACKoJxOcv/M8QlUV3vavzt97/7/u1jOcw3O/9+iPqPJ/F5HplStX
0LYRVfA4d8d5TCaTJYlxEBjlcyNdl98YWxuakhXkq1FL2EDQjvdqprJSvWDifdi3q2ekKba48vpl
fPv/fQtXrl0F1CqmdnZ2cO622y2XlaAM/PId977t383Nd3ESX3ry0Y85co8kkjv2b9zEjf19SFKQ
U5y77XbsTPes+WDxMh8ARlkN51QB9g6OLYU51LWdyDuaMt336AC0W/hcLYvmFpuqEInYv3EDr11+
Fa++8i3s37wBKECOUPkKe2dO49TeqXzGK3+bKH36/L0P/I+x6S6NF5/63H2R+VcJ9OE2trh5/Saa
2FhfbxDqSY2z585hMpmC+AAwhg8iE3UhVPChwqSe5hKI+TfcK4Y5lyM3PqO5jOLMn5oZrrz+Gl55
5Vu4dvUKJJo0KxnNu7s72Dt1BqEKIMuS+RVO9E/O33//aKPllWrPI4884h56613/ENB/Q4q9Jibc
3L+Jpm2RUjR3H4CdSY29M+ews7uLUIeDlUsmOGcNiyaTKeowtbOamQpzGLjpeiuqWBgqgtnNm3j9
tVfx+muv4cobr8/xG8cOwQdMd3ewu7OTK7AZRHicFL98530PPHngCzvoQ8BiKir8L0D0i6paxZjQ
pgbtrEWTUqflkQK+cjh95jZMdyao6kFLKgCnztyOq1cuW28Nbzyjmkxyl9dOM7OLc0MOEcH+/k3c
uHYNV69ewbU3rqJpTdV2+eSKog3XtQE8mU5ysRAJEf2WEP/773rrxccPW+daYJTx4lNP3Sc+/SMi
+vsgPa0CtLFF27RoYhF12YrMnN17h8l0isl0B9WktoLg4K25gK/gK2OgKoI2mk3RNA1msxlu3ryB
/ZuzTpqU4JYjAmC9/HwIqOoJJpOJNVVmB2L8GZh/hTX9x7vvf9efrru+I4FRxqUvfOF06+LPAPg5
ED4GhRMAmiLaNiKmhJhMVYead7SL0M+54izdwSjHDBWGUUShtNLF0eU2eewdgq+sIVo9QeVLiThd
AtOvkeiv3XPxwS9S1wj9aONE9uPzX/jCXd7Fn4HjnyPFR0BExV8RkylEKgltTHawSxKArD1mkSEK
C3EocQni5OPUTXz6YCfpFSbtnAMTXyHCU0r0OIDfuPDAQ8+fZB1lbCyu89Lv//7t8PIRAv0AGN9P
oIeJEPL2B0AQKEgVdt6ZgdalF5HlAjqXe2jktjNMEBD/KRGeVeInQPTEWx9415eI6ADn6/HG1oJc
L3/+89Pr0/ABhr6DHS4q6G0ALhLobSA6R8Cki7IRNSD6BhRfJ0dfJ8XLIH6Jgeeqmbx09/vff/2Q
x/3FHqrKL3/+8yc+sXuT4/8D1S2c6UfhDmMAAAAASUVORK5CYII=
"
        />
        <g fillOpacity=".65229">
          <path
            onClick={() => onColorChange("t35", "c1")}
            style={style_1}
            d="m10.481 5.5258s-2.5364 7.7729-2.3924 17.365c0.144 9.5917-0.036091 11.751-0.036091 11.751l6.9409-0.01153s-0.05359-11.596-1.0453-18.328c-0.99169-6.7322-1.6791-11.028-1.6791-11.028s-0.17681-0.86967-0.61497-1.2209-1.1731 1.4736-1.1731 1.4736z"
          />
          <path
            onClick={() => onColorChange("t35", "c2")}
            style={style_2}
            d="m11.618 39.511s0.32208-1.2952-1.9352-2.5893c-2.2573-1.2941-3.8669 0.92968-3.8669 0.92968s-2.0775 5.4382-3.1463 10.146c-1.0582 4.6613-0.27341 6.9315 0.35101 7.6936 0.62442 0.76217 2.9197 1.5196 5.9776 1.725s6.4775-0.47861 6.4775-0.47861 2.8843-1.0765 3.2789-2.5424c0.39459-1.4659-1.5185-8.3439-2.6099-12.885-1.0914-4.541-2.938-1.8602-2.938-1.8602s-0.38876 0.54322-1.0128 0.57436c-0.62409 0.03114-0.57584-0.71352-0.57584-0.71352z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
};