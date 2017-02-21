%module "rvo2"
%{
#include "src/RVO.h"
#include "src/Vector2.h"
#include "src/Definitions.h"
#include "src/Agent.h"
#include "src/Obstacle.h"
#include "src/KdTree.h"
#include "src/RVOSimulator.h"
%}

%ignore RVO::Vector2::operator-;
%ignore RVO::Vector2::operator-=;
%ignore RVO::Vector2::operator+;
%ignore RVO::Vector2::operator+=;
%ignore RVO::Vector2::operator*;
%ignore RVO::Vector2::operator*=;
%ignore RVO::Vector2::operator/;
%ignore RVO::Vector2::operator/=;
%ignore RVO::Vector2::operator==;
%ignore RVO::Vector2::operator!=;
%ignore RVO::Vector2::operator<<;
%rename(sub) RVO::Vector2::operator-;
%rename(add) RVO::Vector2::operator+;
%rename(mul) RVO::Vector2::operator*;
%rename(div) RVO::Vector2::operator/;
%rename(isEqual) RVO::Vector2::operator==;
%rename(notEqual) RVO::Vector2::operator!=;
%rename(shiftLeft) RVO::Vector2::operator<<;

%include "src/RVO.h"
%include "src/Vector2.h"
%include "src/Definitions.h"
%include "src/Agent.h"
%include "src/Obstacle.h"
%include "src/KdTree.h"
%include "src/RVOSimulator.h"

%include "std_vector.i"
%include "exception.i"

/* http://www.swig.org/Doc1.3/Library.html#Library_stl_cpp_library */
namespace std {
   %template(vectori) vector<int>;
   %template(vectord) vector<double>;
   %template(vectorline) vector<RVO::Line>;
   %template(vectorvector) vector<RVO::Vector2>;
};