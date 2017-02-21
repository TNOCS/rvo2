{
  'targets': [
    {
      'target_name': 'rvo2',
      'defines': [ 'V8_DEPRECATION_WARNINGS=1' ],
      'cflags': [ '-Wall -O3' ],
      'ldflags': [ '-NODEFAULTLIB:libcmt.lib' ],
      'sources': [ 'rvo2_wrap.cxx', 'src/Agent.cpp', 'src/KdTree.cpp', 'src/Obstacle.cpp', 'src/RVOSimulator.cpp' ],
      'configurations': {
        'Release': {
          'msvs_settings': {
            'VCCLCompilerTool': {
              'ExceptionHandling': 1,
            }
          }
        }
      }
    }]
}
