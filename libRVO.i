%module "libRVO"
%{
#include "RVO.h"
#include "Vector2.h"
#include "Definitions.h"
#include "Agent.h"
#include "Obstacle.h"
#include "KdTree.h"
#include "RVOSimulator.h"
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
%rename(subtract) RVO::Vector2::operator-=;
%rename(add) RVO::Vector2::operator+;
%rename(adding) RVO::Vector2::operator+=;
%rename(mul) RVO::Vector2::operator*;
%rename(multiply) RVO::Vector2::operator*=;
%rename(div) RVO::Vector2::operator/;
%rename(divide) RVO::Vector2::operator/=;
%rename(equals) RVO::Vector2::operator==;
%rename(notEqual) RVO::Vector2::operator!=;
%rename(shiftLeft) RVO::Vector2::operator<<;

%include "RVO.h"
%include "Vector2.h"
%include "Definitions.h"
%include "Agent.h"
%include "Obstacle.h"
%include "KdTree.h"
%include "RVOSimulator.h"

%include "std_vector.i"
%include "exception.i"

/* http://www.swig.org/Doc1.3/Library.html#Library_stl_cpp_library */
namespace std {
   %template(vectori) vector<int>;
   %template(vectord) vector<double>;
   %template(vectorline) vector<RVO::Line>;
   %template(vectorvector) vector<RVO::Vector2>;
};