{
  'targets': [
    {
      'target_name': 'libRVO',
      'defines': [ 'V8_DEPRECATION_WARNINGS=1' ],
      'cflags': [ '-Wall' ],
      'ldflags': [ '/NODEFAULTLIB:libcmt.lib ' ],
      'sources': [ 'libRVO_wrap.cxx', 'Agent.cpp', 'KdTree.cpp', 'Obstacle.cpp', 'RVOSimulator.cpp' ]
    }
  ]
}
