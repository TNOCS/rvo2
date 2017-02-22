# RVO2

RVO2 is a node.js wrapper around the pedestrian simulator [RVO2 library](http://gamma.cs.unc.edu/RVO2) which implements the [ORCA](http://gamma.cs.unc.edu/ORCA) algorithm. The wrapper is created with [SWIG (Simplified Wrapper and Interface Generator)](http://www.swig.org) and node-gyp to generate the bindings for node.js.

## About RVO2

RVO2 Library is an easy-to-use C++ implementation of the optimal reciprocal collision avoidance (ORCA) formulation <http://gamma.cs.unc.edu/ORCA/> for
multi-agent simulation. RVO2 Library automatically uses parallelism for computing the motion of the agents on machines with multiple processors and a
compiler supporting OpenMP <http://www.openmp.org/>.

Please send all bug reports to <geom@cs.unc.edu>.

The authors may be contacted via:

Jur van den Berg, Stephen J. Guy, Jamie Snape, Ming C. Lin, Dinesh Manocha
Dept. of Computer Science
201 S. Columbia St.
Frederick P. Brooks, Jr. Computer Science Bldg.
Chapel Hill, N.C. 27599-3175
United States of America

<http://gamma.cs.unc.edu/RVO2/>


## Installation

```console
npm install rvo2 --save
```

## Usage

See the `examples` folder.

## Manual compilation

In case you want to compile the application yourself, here are some instructions to help you along the way. Please note that these instructions were only tested on Windows.

### Prerequisites

Install [node](http://nodejs.org).

Run as non-admin (installs node-gyp in your own environment)
```console
npm install --global node-gyp
node-gyp install
```

Run as admin to install the C++ tools.
```console
npm install --global --production windows-build-tools
```

Optionally, copy folder `c:\Users\USERNAME\.node-gyp\6.9.5\x64` to `c:\Users\USERNAME\.node-gyp\6.9.5\Release` in case the linker complains that it cannot find the `node.lib` file.

### Compiling the library

```console
swig -javascript -node -c++ rvo2.i
```
Open the generated `rvo2_wrap.cxx` in your favorite editor and replace `std::vector< Line >` with `std::vector< RVO::Line >`.

Finally, compile the library with:
```console
node-gyp rebuild --verbose
```

### Some remarks about the process

The first time I've tried the above, it didn't work, and I had to manually make several changes to the VS2015 solution to get it working. See below. When it finally worked, I started looking for options to create a better SWIG file (`rvo2.i`), and a better `binding.gyp` file.

When building the solution with `node-gyp`, I received the following error:
`LINK : warning LNK4098: defaultlib 'LIBCMT' conflicts with use of other libs; use /NODEFAULTLIB:library [C:\dev\web\test_rvo2\build\rvo2.vcxproj]`.
Unfortunatelty, `binding.gyp` is poorly documented, but after some trial-and-error, I added `'ldflags': [ '/NODEFAULTLIB:libcmt.lib ' ]` to the file. In addition, I've added all the source `*.cpp` files too to the `sources` property.

About the SWIG file, there was also a lot of trial-and-error involved: specifically, I needed to include the `std_vector.i` file since the C++ code uses `std::vector`, and I needed to create a mapping from `vector<RVO::Vector2>` to a new name, in this case `vectorvector`.

```cpp
%include "std_vector.i"
%include "exception.i"

/* http://www.swig.org/Doc1.3/Library.html#Library_stl_cpp_library */
namespace std {
   %template(vectori) vector<int>;
   %template(vectord) vector<double>;
   %template(vectorline) vector<RVO::Line>;
   %template(vectorvector) vector<RVO::Vector2>;
};
```

### Manual edits to VS2015 solution

Open `build\binding.sln` solution in VS2015
replace in rvo2
  Line --> RVO::Line
Switch to RELEASE mode

Open rvo2 project properties
Linker | Input | Additional dependencies and add:
  msvcrt.lib; msvcmrt.lib
Linker | Input | Ignore specific default libraries and add
  libcmt.lib

Add the original `*.cpp` to the rvo2 project (drag-n-drop).
